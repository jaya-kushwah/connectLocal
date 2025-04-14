// import React, { useState, useEffect } from "react";
// import {
//   FiEdit,
//   FiUpload,
//   FiCheck,
//   FiX,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiInfo,
//   FiMessageSquare,
//   FiStar
// } from "react-icons/fi";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { confirmAlert } from "react-confirm-alert";
// import { useCookies } from 'react-cookie';
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Badge from "react-bootstrap/Badge";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import Container from "../Container";
// // import StarRating from "./StarRating"; // You still need this component

// const API_BASE_URL = "http://localhost:8080";

// const Profile = () => {
//   const [cookies] = useCookies(['userId']);
//   const userId = cookies.userId;

//   console.log(userId);

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     interests: [],
//     profileImage: "",
//     location: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [editingField, setEditingField] = useState(null);
//   const [tempValue, setTempValue] = useState("");
//   const [showInterestsModal, setShowInterestsModal] = useState(false);
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [availableInterests] = useState([
//     "Career",
//     "Money",
//     "Stock",
//     "Mortgage",
//     "Investing",
//     "Real Estate",
//     "Retirement",
//     "Taxes",
//   ]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!userId) {
//         toast.error("User ID not found in cookies");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE_URL}/user/${id}`);
//         const userData = res.data;

//         setProfile({
//           name: userData.name || "",
//           email: userData.email || "",
//           phone: userData.mobile || "",
//           expertise: userData.interests || [],
//           location: userData.location || "",
//         });
//         setSelectedInterests(userData.interests || []);
//         toast.dismiss();
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         toast.error(
//           err.response?.data?.message || "Failed to load profile data"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [id]);


//   const showConfirmationDialog = (message, onConfirm) => {
//     confirmAlert({
//       title: "Confirm Action",
//       message: message,
//       buttons: [
//         {
//           label: "Confirm",
//           onClick: () => {
//             toast.info("Processing...", {
//               autoClose: 1000,
//               position: "top-center",
//               className: "toast-loading",
//             });
//             onConfirm();
//           },
//         },
//         {
//           label: "Cancel",
//           onClick: () =>
//             toast("Changes discarded", {
//               autoClose: 1000,
//               position: "top-center",
//             }),
//         },
//       ],
//       closeOnEscape: true,
//       closeOnClickOutside: true,
//       overlayClassName: "confirm-overlay",
//     });
//   };

//   const handleEditStart = (field, value) => {
//     setEditingField(field);
//     setTempValue(value);
//   };

//   const handleEditCancel = () => {
//     setEditingField(null);
//     setTempValue("");
//   };

//   const handleEditSave = async () => {
//     if (!tempValue || tempValue === profile[editingField]) {
//       handleEditCancel();
//       return;
//     }

//     try {
//       showConfirmationDialog(
//         "Are you sure you want to save these changes?",
//         async () => {
//           const updatedData = { [editingField]: tempValue };
//           const response = await axios.patch(
//             `${API_BASE_URL}/user/updateProfile/${userId}`,
//             updatedData
//           );

//           setProfile((prev) => ({ ...prev, [editingField]: tempValue }));
//           setEditingField(null);
//           setTempValue("");

//           toast.success("Profile updated successfully", {
//             position: "top-center",
//             autoClose: 2000,
//           });
//         }
//       );
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.response?.data?.message || "Failed to update profile", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };

//   const toggleInterest = (interest) => {
//     setSelectedInterests((prev) =>
//       prev.includes(interest)
//         ? prev.filter((i) => i !== interest)
//         : [...prev, interest]
//     );
//   };

//   const saveInterests = async () => {
//     try {
//       showConfirmationDialog("Save these interest changes?", async () => {
//         const response = await axios.patch(
//           `${API_BASE_URL}/user/updateProfile/${userId}`,
//           { expertise: selectedInterests }
//         );

//         setProfile((prev) => ({ ...prev, expertise: selectedInterests }));
//         setShowInterestsModal(false);

//         toast.success("Interests updated successfully!", {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       });
//     } catch (error) {
//       console.error("Interest update error:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update interests",
//         {
//           position: "top-center",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.match("image.*")) {
//       toast.error("Please select a valid image file", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       showConfirmationDialog("Upload this profile picture?", async () => {
//         const formData = new FormData();
//         formData.append("profileImage", file);

//         const response = await axios.patch(
//           `${API_BASE_URL}/user/updateProfile/${userId}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         setProfile((prev) => ({
//           ...prev,
//           profileImage: response.data.profileImage,
//         }));

//         toast.success("Profile picture updated!", {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       });
//     } catch (error) {
//       console.error("Image upload error:", error);
//       toast.error(error.response?.data?.message || "Failed to upload image", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };

//   const LoadingSkeleton = () => (
//     <div className="placeholder-glow">
//       <div className="d-flex align-items-center mb-4">
//         <div className="placeholder rounded-circle me-3" style={{ width: '80px', height: '80px' }}></div>
//         <div>
//           <h5 className="placeholder col-6"></h5>
//           <p className="placeholder col-4"></p>
//         </div>
//       </div>
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="mb-3">
//           <p className="placeholder col-2 mb-2"></p>
//           <p className="placeholder col-12"></p>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="container py-5">
//         <div className="card">
//           <div className="card-body">
//             <LoadingSkeleton />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const renderEditableField = (field, label, icon, type = "text") => {
//     return (
//       <div className="mb-4 p-3 bg-light rounded">
//         <Form.Label className="d-flex align-items-center text-muted mb-2">
//           {icon && <span className="me-2">{icon}</span>}
//           {label}
//         </Form.Label>

//         {editingField === field ? (
//           <div className="d-flex align-items-center">
//             <Form.Control
//               type={type}
//               value={tempValue}
//               onChange={(e) => setTempValue(e.target.value)}
//               autoFocus
//             />
//             <div className="ms-2 d-flex">
//               <Button variant="success" size="sm" onClick={handleEditSave} className="me-1">
//                 <FiCheck />
//               </Button>
//               <Button variant="danger" size="sm" onClick={handleEditCancel}>
//                 <FiX />
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="d-flex justify-content-between align-items-center">
//             <div className={!profile[field] ? "text-muted" : ""}>
//               {profile[field] || `No ${label.toLowerCase()} provided`}
//             </div>
//             <Button
//               variant="link"
//               onClick={() => handleEditStart(field, profile[field])}
//               className="text-decoration-none"
//             >
//               <FiEdit />
//             </Button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <Container>
//       <div  className="bg-light min-vh-100 py-5">
//         <div style={{ marginLeft: "23%", width:"125%" ,marginTop:"-9%"}} className="container">
//           {/* Profile Header */}
//           <div className="bg-primary text-white rounded-top p-4 d-flex justify-content-between align-items-center mb-0">
//             <h2 className="h5 mb-0 d-flex align-items-center">
//               <FiUser className="me-2" />
//               My Profile
//             </h2>
//             {/* <Button variant="outline-light" size="sm">
//               View Public Profile
//             </Button> */}
//           </div>

//           {/* Profile Content */}
//           <div className="card rounded-top-0 border-top-0">
//             <div className="card-body p-4">
//               <div className="row">
//                 {/* Left Column - Basic Info */}
//                 <div className="col-lg-6 pe-lg-4">
//                   {/* Profile Image Section */}
//                   <div className="d-flex align-items-center mb-4">
//                     <div className="position-relative me-4">
//                       <img
//                         src={
//                           profile.profileImage ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             profile.name
//                           )}&background=random&size=200`
//                         }
//                         className="rounded-circle border-4 border-white shadow"
//                         width="96"
//                         height="96"
//                         alt="Profile"
//                         onError={(e) => {
//                           e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             profile.name
//                           )}&background=random&size=200`;
//                         }}
//                       />
//                       <label className="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm cursor-pointer">
//                         <FiUpload className="text-primary" />
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageUpload}
//                           className="d-none"
//                         />
//                       </label>
//                     </div>
//                     <div>
//                       <h3 className="h4 mb-1">{profile.name}</h3>
//                       <p className="text-muted mb-2">{profile.location}</p>
//                       <div className="d-flex flex-wrap gap-2">
//                         {profile.expertise.slice(0, 3).map((interest) => (
//                           <Badge key={interest} bg="primary" pill>
//                             {interest}
//                           </Badge>
//                         ))}
//                         {profile.expertise.length > 3 && (
//                           <Badge bg="secondary" pill>
//                             +{profile.expertise.length - 3} more
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Editable Fields */}
//                   {renderEditableField("name", "Full Name", <FiUser />)}
//                   {renderEditableField("email", "Email Address", <FiMail />, "email")}
//                   {renderEditableField("phone", "Phone Number", <FiPhone />, "tel")}
//                   {renderEditableField("location", "Location")}

//                   {/* About Section */}
//                   <div className="mb-4 p-3 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <Form.Label className="d-flex align-items-center text-muted">
//                         <FiInfo className="me-2" />
//                         About Me
//                       </Form.Label>
//                       <Button
//                         variant="link"
//                         onClick={() => handleEditStart("about", profile.about)}
//                         className="text-decoration-none"
//                       >
//                         <FiEdit />
//                       </Button>
//                     </div>

//                     {editingField === "about" ? (
//                       <>
//                         <Form.Control
//                           as="textarea"
//                           rows={4}
//                           value={tempValue}
//                           onChange={(e) => setTempValue(e.target.value)}
//                           className="mb-2"
//                         />
//                         <div className="d-flex justify-content-end gap-2">
//                           <Button variant="outline-secondary" size="sm" onClick={handleEditCancel}>
//                             Cancel
//                           </Button>
//                           <Button variant="primary" size="sm" onClick={handleEditSave}>
//                             Save
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <p className={!profile.about ? "text-muted" : ""}>
//                         {profile.about || "No description provided"}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column - Professional Details */}
//                 <div className="col-lg-6 ps-lg-4">
//                   <div className="bg-light rounded p-4 mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                       <div>
//                         <h3 className="h5 mb-1">Professional Details</h3>
//                         <p className="text-muted small mb-0">Information shown to other users</p>
//                       </div>
//                       <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
//                         <FiUser className="text-primary" />
//                       </div>
//                     </div>

//                     {/* Expertise Section */}
//                     <div className="mb-4">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4 className="h6 mb-0">Areas of Expertise</h4>
//                         <Button
//                           variant="link"
//                           size="sm"
//                           onClick={() => setShowInterestsModal(true)}
//                           className="text-decoration-none"
//                         >
//                           <FiEdit className="me-1" />
//                           Edit
//                         </Button>
//                       </div>
//                       <div className="d-flex flex-wrap gap-2">
//                         {profile.expertise.length > 0 ? (
//                           profile.expertise.map((interest) => (
//                             <Badge key={interest} bg="primary" pill>
//                               {interest}
//                             </Badge>
//                           ))
//                         ) : (
//                           <p className="text-muted small">No expertise selected</p>
//                         )}
//                       </div>
//                     </div>


//                     {/* Customer Reviews Section */}
//                     <div>
//                       <h4 className="h6 mb-3">Recent Reviews</h4>
//                       <div className="bg-white p-4 rounded border text-center">
//                         <FiMessageSquare className="text-muted mb-2" size={48} />
//                         <p className="text-muted small mb-0">Customer reviews will appear here</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Interests Modal */}
//         <Modal show={showInterestsModal} onHide={() => setShowInterestsModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Select Your Expertise</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p className="text-muted small mb-3">Select the areas you specialize in (max 8):</p>
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {availableInterests.map((interest) => (
//                 <Button
//                   key={interest}
//                   variant={selectedInterests.includes(interest) ? "primary" : "outline-secondary"}
//                   size="sm"
//                   onClick={() => toggleInterest(interest)}
//                   className="rounded-pill"
//                 >
//                   {interest}
//                 </Button>
//               ))}
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="outline-secondary" onClick={() => {
//               setSelectedInterests(profile.expertise);
//               setShowInterestsModal(false);
//             }}>
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={saveInterests}
//               disabled={selectedInterests.length === 0}
//             >
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </Container>
//   );
// };

// export default Profile;




import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiUpload,
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiInfo,
  FiMessageSquare,
  FiStar
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useCookies } from 'react-cookie';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import "react-confirm-alert/src/react-confirm-alert.css";
import Container from "../Container";
// import StarRating from "./StarRating"; // You still need this component

const API_BASE_URL = "http://localhost:8080";

const Profile = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;

  console.log(userId);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    expertise: [],
    experience: "",
    rating: "",
    profileImage: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [availableInterests] = useState([
    "Career",
    "Money",
    "Stock",
    "Mortgage",
    "Investing",
    "Real Estate",
    "Retirement",
    "Taxes",
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        toast.error("User ID not found in cookies");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/user/${userId}`);
        const userData = res.data;

        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          about: userData.about || "",
          expertise: userData.expertise || [],
          experience: userData.experience || "",
          rating: userData.rating || "",
          profileImage: userData.profileImage || "",
          location: userData.location || "",
        });
        setSelectedInterests(userData.expertise || []);
        toast.dismiss();
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


  const showConfirmationDialog = (message, onConfirm) => {
    confirmAlert({
      title: "Confirm Action",
      message: message,
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            toast.info("Processing...", {
              autoClose: 1000,
              position: "top-center",
              className: "toast-loading",
            });
            onConfirm();
          },
        },
        {
          label: "Cancel",
          onClick: () =>
            toast("Changes discarded", {
              autoClose: 1000,
              position: "top-center",
            }),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "confirm-overlay",
    });
  };

  const handleEditStart = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleEditSave = async () => {
    if (!tempValue || tempValue === profile[editingField]) {
      handleEditCancel();
      return;
    }

    try {
      showConfirmationDialog(
        "Are you sure you want to save these changes?",
        async () => {
          const updatedData = { [editingField]: tempValue };
          const response = await axios.patch(
            `${API_BASE_URL}/user/updateProfile/${userId}`,
            updatedData
          );

          setProfile((prev) => ({ ...prev, [editingField]: tempValue }));
          setEditingField(null);
          setTempValue("");

          toast.success("Profile updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      );
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const saveInterests = async () => {
    try {
      showConfirmationDialog("Save these interest changes?", async () => {
        const response = await axios.patch(
          `${API_BASE_URL}/user/updateProfile/${userId}`,
          { expertise: selectedInterests }
        );

        setProfile((prev) => ({ ...prev, expertise: selectedInterests }));
        setShowInterestsModal(false);

        toast.success("Interests updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      });
    } catch (error) {
      console.error("Interest update error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update interests",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select a valid image file", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      showConfirmationDialog("Upload this profile picture?", async () => {
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await axios.patch(
          `${API_BASE_URL}/user/updateProfile/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProfile((prev) => ({
          ...prev,
          profileImage: response.data.profileImage,
        }));

        toast.success("Profile picture updated!", {
          position: "top-center",
          autoClose: 2000,
        });
      });
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload image", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const LoadingSkeleton = () => (
    <div className="placeholder-glow">
      <div className="d-flex align-items-center mb-4">
        <div className="placeholder rounded-circle me-3" style={{ width: '80px', height: '80px' }}></div>
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

  const renderEditableField = (field, label, icon, type = "text") => {
    return (
      <div className="mb-4 p-3 bg-light rounded">
        <Form.Label className="d-flex align-items-center text-muted mb-2">
          {icon && <span className="me-2">{icon}</span>}
          {label}
        </Form.Label>

        {editingField === field ? (
          <div className="d-flex align-items-center">
            <Form.Control
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
            />
            <div className="ms-2 d-flex">
              <Button variant="success" size="sm" onClick={handleEditSave} className="me-1">
                <FiCheck />
              </Button>
              <Button variant="danger" size="sm" onClick={handleEditCancel}>
                <FiX />
              </Button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className={!profile[field] ? "text-muted" : ""}>
              {profile[field] || `No ${label.toLowerCase()} provided`}
            </div>
            <Button
              variant="link"
              onClick={() => handleEditStart(field, profile[field])}
              className="text-decoration-none"
            >
              <FiEdit />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container>
      <div  className="bg-light min-vh-100 py-5">
        <div style={{ marginLeft: "23%", width:"125%" ,marginTop:"-9%"}} className="container">
          {/* Profile Header */}
          <div className="bg-primary text-white rounded-top p-4 d-flex justify-content-between align-items-center mb-0">
            <h2 className="h5 mb-0 d-flex align-items-center">
              <FiUser className="me-2" />
              My Profile
            </h2>
            {/* <Button variant="outline-light" size="sm">
              View Public Profile
            </Button> */}
          </div>

          {/* Profile Content */}
          <div className="card rounded-top-0 border-top-0">
            <div className="card-body p-4">
              <div className="row">
                {/* Left Column - Basic Info */}
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
                          onChange={handleImageUpload}
                          className="d-none"
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="h4 mb-1">{profile.name}</h3>
                      <p className="text-muted mb-2">{profile.location}</p>
                      <div className="d-flex flex-wrap gap-2">
                        {profile.expertise.slice(0, 3).map((interest) => (
                          <Badge key={interest} bg="primary" pill>
                            {interest}
                          </Badge>
                        ))}
                        {profile.expertise.length > 3 && (
                          <Badge bg="secondary" pill>
                            +{profile.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Editable Fields */}
                  {renderEditableField("name", "Full Name", <FiUser />)}
                  {renderEditableField("email", "Email Address", <FiMail />, "email")}
                  {renderEditableField("phone", "Phone Number", <FiPhone />, "tel")}
                  {renderEditableField("location", "Location")}

                  {/* About Section */}
                  <div className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Form.Label className="d-flex align-items-center text-muted">
                        <FiInfo className="me-2" />
                        About Me
                      </Form.Label>
                      <Button
                        variant="link"
                        onClick={() => handleEditStart("about", profile.about)}
                        className="text-decoration-none"
                      >
                        <FiEdit />
                      </Button>
                    </div>

                    {editingField === "about" ? (
                      <>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="mb-2"
                        />
                        <div className="d-flex justify-content-end gap-2">
                          <Button variant="outline-secondary" size="sm" onClick={handleEditCancel}>
                            Cancel
                          </Button>
                          <Button variant="primary" size="sm" onClick={handleEditSave}>
                            Save
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className={!profile.about ? "text-muted" : ""}>
                        {profile.about || "No description provided"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column - Professional Details */}
                <div className="col-lg-6 ps-lg-4">
                  <div className="bg-light rounded p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h3 className="h5 mb-1">Professional Details</h3>
                        <p className="text-muted small mb-0">Information shown to other users</p>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                        <FiUser className="text-primary" />
                      </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="h6 mb-0">Areas of Expertise</h4>
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
                        {profile.expertise.length > 0 ? (
                          profile.expertise.map((interest) => (
                            <Badge key={interest} bg="primary" pill>
                              {interest}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-muted small">No expertise selected</p>
                        )}
                      </div>
                    </div>


                    {/* Customer Reviews Section */}
                    <div>
                      <h4 className="h6 mb-3">Recent Reviews</h4>
                      <div className="bg-white p-4 rounded border text-center">
                        <FiMessageSquare className="text-muted mb-2" size={48} />
                        <p className="text-muted small mb-0">Customer reviews will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Modal */}
        <Modal show={showInterestsModal} onHide={() => setShowInterestsModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Your Expertise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted small mb-3">Select the areas you specialize in (max 8):</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {availableInterests.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "primary" : "outline-secondary"}
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
            <Button variant="outline-secondary" onClick={() => {
              setSelectedInterests(profile.expertise);
              setShowInterestsModal(false);
            }}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={saveInterests}
              disabled={selectedInterests.length === 0}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default Profile;
