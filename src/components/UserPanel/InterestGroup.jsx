import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import "../../assets/Style/InterestGroup.css";
import Container from "../Container";

// const InterestGroup = () => {
//     const cookies = new Cookies();
//     const navigate = useNavigate();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [members, setMembers] = useState([]);
//     const [memberInput, setMemberInput] = useState("");
//     const [activeTab, setActiveTab] = useState("details");

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm();

//     const addMember = (e) => {
//         e.preventDefault();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (memberInput.trim() && !members.includes(memberInput.trim())) {
//             if (emailRegex.test(memberInput.trim())) {
//                 setMembers([...members, memberInput.trim()]);
//                 setMemberInput("");
//                 setError("");
//             } else {
//                 setError("Please enter a valid email address");
//             }
//         }
//     };

//     const removeMember = (email) => {
//         setMembers(members.filter((m) => m !== email));
//     };


//     const onSubmit = async (data) => {
//         const userData = cookies.get('user');
    
//         if (!userData || !userData.token || !userData._id) {
//             setError("You must be logged in to create a group");
//             setTimeout(() => navigate("/login"), 1500);
//             return;
//         }
    
//         if (members.length === 0) {
//             setError("Please add at least one group member");
//             return;
//         }
    
//         setIsSubmitting(true);
//         setError("");
//         setSuccess("");
    
//         try {
//             // ✅ Step 1: Validate members first
//             const validationRes = await axios.post(
//                 "http://localhost:8080/group/validate-emails",
//                 { emails: members },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${userData.token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
    
//             const { existingUsers, nonExistingEmails } = validationRes.data;
    
//             if (nonExistingEmails.length > 0) {
//                 setError(
//                     `These members are not registered: ${nonExistingEmails.join(", ")}`
//                 );
//                 setIsSubmitting(false);
//                 return;
//             }
    
//             // ✅ Step 2: Proceed with group creation using existing users only
//             const groupData = {
//                 userId: userData._id,
//                 name: data.name,
//                 description: data.description,
//                 groupMember: existingUsers.map((user) => ({
//                     email: user.email,
//                     userId: user._id,
//                     name: user.name,
//                     role: "member",
//                 })),
//             };
    
//             const response = await axios.post(
//                 "http://localhost:8080/group/",
//                 groupData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${userData.token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
    
//             setSuccess("Group created successfully! Redirecting...");
//             reset();
//             setMembers([]);
//             setTimeout(() => navigate(`/groups/${response.data.data._id}`), 1500);
//         } catch (err) {
//             console.error("API Error:", err);
//             let errorMessage = "Failed to create group";
    
//             if (err.response) {
//                 if (err.response.status === 401) {
//                     errorMessage = "Session expired. Please login again.";
//                     ["user", "token", "auth", "_id", "email"].forEach((name) =>
//                         cookies.remove(name, { path: "/" })
//                     );
//                     setTimeout(() => navigate("/login"), 2000);
//                 } else if (err.response.data?.message) {
//                     errorMessage = err.response.data.message;
//                 }
//             }
//             setError(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
    
const InterestGroup = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addMember = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (memberInput.trim() && !members.includes(memberInput.trim())) {
      if (emailRegex.test(memberInput.trim())) {
        setMembers([...members, memberInput.trim()]);
        setMemberInput("");
        setError("");
      } else {
        setError("Please enter a valid email address");
      }
    }
  };

  const removeMember = (email) => {
    setMembers(members.filter((m) => m !== email));
  };

  const onSubmit = async (data) => {
    const userData = cookies.get('user');
    
    // Check for user session
    if (!userData || !userData.token || !userData._id) {
      setError("You must be logged in to create a group");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    
    // Check if members are added
    if (members.length === 0) {
      setError("Please add at least one group member");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      // Step 1: Validate member emails
      const validationRes = await axios.post(
        "http://localhost:8080/group/validate-emails",
        { emails: members },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { existingUsers, nonExistingEmails } = validationRes.data;
      
      if (nonExistingEmails.length > 0) {
        setError(`These members are not registered: ${nonExistingEmails.join(", ")}`);
        setIsSubmitting(false);
        return;
      }

      // Step 2: Proceed with group creation using existing users only
      const groupData = {
        userId: userData._id,
        name: data.name,
        description: data.description,
        groupMember: existingUsers.map((user) => ({
          email: user.email,
          userId: user._id,
          name: user.name,
          role: "member",
        })),
      };

      const response = await axios.post(
        "http://localhost:8080/group/",
        groupData,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Group created successfully! Redirecting...");
      reset();
      setMembers([]);
    //   setTimeout(() => navigate(`/groups/${response.data.data._id}`), 1500);
    } catch (err) {
      console.error("API Error:", err);
      let errorMessage = "Failed to create group";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          // Clear cookies and session data
          ["user", "token", "auth", "_id", "email"].forEach((name) =>
            cookies.remove(name, { path: "/" })
          );
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


    // const onSubmit = async (data) => {
    //     const userData = cookies.get('user');

    //     if (!userData || !userData.token || !userData._id) {
    //         setError("You must be logged in to create a group");
    //         setTimeout(() => navigate("/login"), 1500);
    //         return;
    //     }

    //     if (members.length === 0) {
    //         setError("Please add at least one group member");
    //         return;
    //     }

    //     setIsSubmitting(true);
    //     setError("");
    //     setSuccess("");

    //     try {
    //         const groupData = {
    //             userId: userData._id,
    //             name: data.name,
    //             description: data.description,
    //             groupMember: members.map((email) => ({ email, role: "member" })),
    //         };

    //         const response = await axios.post(
    //             "http://localhost:8080/group/",
    //             groupData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${userData.token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         setSuccess("Group created successfully! Redirecting...");
    //         reset();
    //         setMembers([]);
    //         setTimeout(() => navigate(`/groups/${response.data.data._id}`), 1500);
    //     } catch (err) {
    //         console.error("API Error:", err);
    //         let errorMessage = "Failed to create group";

    //         if (err.response) {
    //             if (err.response.status === 401) {
    //                 errorMessage = "Session expired. Please login again.";
    //                 ["user", "token", "auth", "_id", "email"].forEach((name) => {
    //                     cookies.remove(name, { path: "/" });
    //                 });
    //                 setTimeout(() => navigate("/login"), 2000);
    //             } else if (err.response.data?.message) {
    //                 errorMessage = err.response.data.message;
    //             }
    //         }
    //         setError(errorMessage);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
            <div className="group-creation-container">
                <div className="group-creation-card">
                    <div className="group-header">
                        <div className="header-content">
                            <h2>Create New Group</h2>
                            <p>Bring people together and collaborate effectively</p>
                        </div>
                        <div className="group-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="group-body">
                        <div className="creation-tabs">
                            <button
                                className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                                onClick={() => setActiveTab("details")}
                            >
                                Group Details
                            </button>
                            <button
                                className={`tab-button ${activeTab === "members" ? "active" : ""}`}
                                onClick={() => setActiveTab("members")}
                            >
                                Members ({members.length})
                            </button>
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="alert-icon"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="alert-message">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="alert-icon"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="alert-message">{success}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {activeTab === "details" && (
                                <div className="tab-content">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Group Name *
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            {...register("name", { required: "Group name is required" })}
                                            className={`form-input ${errors.name ? "form-input-error" : ""}`}
                                            placeholder="e.g., Marketing Team"
                                        />
                                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description" className="form-label">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            {...register("description", { required: "Description is required" })}
                                            className={`form-input ${errors.description ? "form-input-error" : ""}`}
                                            placeholder="What's this group about?"
                                        />
                                        {errors.description && (
                                            <p className="error-message">{errors.description.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === "members" && (
                                <div className="tab-content">
                                    <div className="form-group">
                                        <label className="form-label">Add Members *</label>
                                        <div className="member-input-group">
                                            <input
                                                type="email"
                                                value={memberInput}
                                                onChange={(e) => setMemberInput(e.target.value)}
                                                className="member-input form-input"
                                                placeholder="member@example.com"
                                                onKeyPress={(e) => e.key === "Enter" && addMember(e)}
                                            />
                                            <button
                                                type="button"
                                                onClick={addMember}
                                                className="add-member-btn"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Add
                                            </button>
                                        </div>
                                        <p className="input-hint">
                                            Enter email addresses of people you want to invite
                                        </p>
                                    </div>

                                    {members.length > 0 && (
                                        <div className="form-group">
                                            <h3 className="members-list-title">
                                                Members to be added ({members.length})
                                            </h3>
                                            <ul className="members-list">
                                                {members.map((email, index) => (
                                                    <li key={index} className="member-item">
                                                        <div className="member-email">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="member-icon"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span>{email}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMember(email)}
                                                            className="remove-member-btn"
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="form-actions">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setMembers([]);
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className="reset-btn"
                                    disabled={isSubmitting}
                                >
                                    Clear All
                                </button>

                                {activeTab === "details" ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("members")}
                                        className="next-btn"
                                    >
                                        Next
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="submit-btn"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="loading-spinner"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Group"
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        // </Container>
    );
};

export default InterestGroup;