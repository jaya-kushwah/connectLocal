import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiUpload,
  FiUser,
  FiMail,
  FiPhone,
  FiInfo,
  FiMessageSquare,
  FiMapPin,
  FiSave,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Container from "../Container";
import '../../assets/Style/Profile.css'

const API_BASE_URL = "http://localhost:8080";

const Profile = () => {
  const [cookies] = useCookies(["user", "_id"]);
  const userId =
    cookies._id || (cookies.user ? cookies.user._id : null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    interests: [],
    auth: "user",
    createdAt: "",
    updatedAt: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [availableInterests] = useState([
    "Tech Meetups",
    "Career",
    "Money",
    "Stock",
    "Mortgage",
    "Investing",
    "Real Estate",
    "Retirement",
    "Taxes",
  ]);
  const [imageFile, setImageFile] = useState(null);

  
  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {

      if (!userId) {
        toast.error("User ID not found in cookies");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);

        if (response.data && response.data.data) {
          const userData = response.data.data;
          const newProfile = {
            name: userData.name || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            location: userData.location || "",
            interests: userData.interests || [],
            auth: userData.auth || "user",
            createdAt: userData.createdAt || new Date().toISOString(),
            updatedAt: userData.updatedAt || new Date().toISOString(),
            profileImage: userData.profileImage || "",
          };

          setProfile(newProfile);
          setSelectedInterests(userData.interests || []);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            location: userData.location || "",
          });

          // Cache the profile data
          localStorage.setItem(
            `userProfile_${userId}`,
            JSON.stringify(newProfile)
          );
        } else {
          toast.error("Invalid user data received from server");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error(
          err.response?.data?.message || "Failed to load profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
    setEditing(true);
  };

  const handleSaveChanges = async () => {
    console.log(userId, 'userId');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/update/${userId}`,
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          location: formData.location,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Profile updated successfully!");  // ✅ FIXED
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select a valid image file");
      return;
    }

    setImageFile(file);
    setEditing(true);

    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfile((prev) => ({
        ...prev,
        profileImage: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const updates = {};
      let hasUpdates = false;

      // Check which fields have changed
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== profile[key]) {
          updates[key] = formData[key];
          hasUpdates = true;
        }
      });

      // Check if interests have changed
      if (
        JSON.stringify(selectedInterests) !== JSON.stringify(profile.interests)
      ) {
        updates.interests = selectedInterests;
        hasUpdates = true;
      }

      // If no changes, just return
      if (!hasUpdates && !imageFile) {
        toast.info("No changes to save");
        return;
      }

      // Prepare form data if there's an image
      let dataToSend;
      if (imageFile) {
        dataToSend = new FormData();
        dataToSend.append("profileImage", imageFile);
        Object.keys(updates).forEach((key) => {
          dataToSend.append(key, updates[key]);
        });
      } else {
        dataToSend = updates;
      }

      const config = {
        headers: imageFile
          ? {
            "Content-Type": "multipart/form-data",
          }
          : {},
      };

      const response = await axios.patch(
        `${API_BASE_URL}/user/${userId}`,
        imageFile ? dataToSend : updates,
        config
      );

      if (response.data && response.data.data) {
        const updatedProfile = {
          ...profile,
          ...updates,
          interests: selectedInterests,
          profileImage: response.data.data.profileImage || profile.profileImage,
          updatedAt: new Date().toISOString(),
        };

        setProfile(updatedProfile);
        setEditing(false);
        setImageFile(null);

        // Update cached data
        localStorage.setItem(
          `userProfile_${userId}`,
          JSON.stringify(updatedProfile)
        );

        toast.success("Profile updated successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const LoadingSkeleton = () => (
    <div className="placeholder-glow">
      <div className="d-flex align-items-center mb-4">
        <div
          className="placeholder rounded-circle me-3"
          style={{ width: "80px", height: "80px" }}
        ></div>
        <div>
          <h5 className="placeholder col-6"></h5>
          <p className="placeholder col-4"></p>
        </div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="mb-3">
          <p className="placeholder col-2 mb-2"></p>
          <p className="placeholder col-12"></p>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const renderField = (field, label, icon, type = "text") => {
    const currentValue = formData[field] || "";

    return (
      <div className="mb-4 p-3 bg-light rounded">
        <Form.Label className="d-flex align-items-center text-muted mb-2">
          {icon && <span className="me-2">{icon}</span>}
          {label}
        </Form.Label>
        <Form.Control
          type={type}
          name={field}
          value={currentValue}
          onChange={handleInputChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    // <Container>
      // <div style={{ marginLeft: "-8%", marginTop: "-5%", width: "95%" }} className="">
        <div  style={{width: "100%", marginTop: "12%" }}>
          <div className="profile-content">
            <div className="row">
              <div className="col-lg-6 pe-lg-4">
                {/* Profile Image Section */}
                <div className="d-flex align-items-center mb-4">
                  <div className="position-relative me-4">
                    <img
                      src={
                        profile.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          profile.name
                        )}&background=random&size=200`
                      }
                      className="rounded-circle border-4 border-white shadow"
                      width="96"
                      height="96"
                      alt="Profile"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          profile.name
                        )}&background=random&size=200`;
                      }}
                    />
                    <label className="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm cursor-pointer">
                      <FiUpload className="text-primary" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="h4 mb-1">{profile.name}</h3>
                    <p className="text-muted mb-2">{profile.location}</p>
                    <div className="d-flex flex-wrap gap-2">
                      {profile.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} bg="primary" pill>
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 3 && (
                        <Badge bg="secondary" pill>
                          +{profile.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                {renderField("name", "Full Name", <FiUser />)}
                {renderField("email", "Email Address", <FiMail />, "email")}
                {renderField("mobile", "Phone Number", <FiPhone />, "tel")}
                {renderField("location", "Location", <FiMapPin />)}

                {/* Account Info Section */}
                <div className="mb-4 p-3 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Form.Label className="d-flex align-items-center text-muted">
                      <FiInfo className="me-2" />
                      Account Information
                    </Form.Label>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Account Type</small>
                    <div>{profile.auth || "User"}</div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Member Since</small>
                    <div>
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Last Updated</small>
                    <div>
                      {new Date(profile.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Professional Details */}
              <div className="col-lg-6 ps-lg-4">
                <div className="bg-light rounded p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h3 className="h5 mb-1">Professional Details</h3>
                      <p className="text-muted small mb-0">
                        Information shown to other users
                      </p>
                    </div>
                    {/* <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <FiUser className="text-primary" />
                    </div> */}
                  </div>

                  {/* Interests Section */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="h6 mb-0">Areas of Interest</h4>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setShowInterestsModal(true)}
                        className="text-decoration-none"
                      >
                        <FiEdit className="me-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {profile.interests.length > 0 ? (
                        profile.interests.map((interest) => (
                          <Badge key={interest} bg="primary" pill>
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted small">
                          No interests selected
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Customer Reviews Section */}
                  <div>
                    <h4 className="h6 mb-3">Recent Reviews</h4>
                    <div className="bg-white p-4 rounded border text-center">
                      <FiMessageSquare className="text-muted mb-2" size={48} />
                      <p className="text-muted small mb-0">
                        Customer reviews will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            {editing && (
              <div className="text-end mt-4">
                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  className="d-inline-flex align-items-center"
                >
                  <FiSave className="me-2" />
                  Save Changes
                </Button>
              </div>
            )}
          {/* </div> */}
        </div>

        {/* Interests Modal */}
        <Modal
          show={showInterestsModal}
          onHide={() => setShowInterestsModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Your Interests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted small mb-3">
              Select the areas you're interested in (max 8):
            </p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {availableInterests.map((interest) => (
                <Button
                  key={interest}
                  variant={
                    selectedInterests.includes(interest)
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => toggleInterest(interest)}
                  className="rounded-pill"
                >
                  {interest}
                </Button>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSelectedInterests(profile.interests);
                setShowInterestsModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setEditing(true);
                setShowInterestsModal(false);
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <style jsx>{`
          .profile-container {
            min-height: 100vh;
            background-color: #f8f9fa;
          }

          .profile-header {
            background-color: #0d6efd;
            color: white;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .profile-content {
            background-color: white;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }

          @media (max-width: 768px) {
            .container {
              padding-left: 15px;
              padding-right: 15px;
            }

            .col-lg-6 {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }

            .d-flex.align-items-center.mb-4 {
              flex-direction: column;
              align-items: flex-start;
            }

            .position-relative.me-4 {
              margin-right: 0;
              margin-bottom: 15px;
            }
          }

          @media (max-width: 576px) {
            .profile-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .profile-header h2 {
              margin-bottom: 10px;
            }

            .btn-outline-light {
              align-self: flex-end;
            }
          }
        `}</style>
      </div>
    // </Container>
  );
};

export default Profile;