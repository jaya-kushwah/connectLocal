// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Spinner, Alert } from "react-bootstrap";

// const ViewGroup = () => {
//     const [groups, setGroups] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchGroups = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8080/group");
//                 setGroups(res.data.data);
//             } catch (err) {
//                 console.error("Error fetching groups:", err);
//                 setError("Failed to load group data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchGroups();
//     }, []);

//     if (loading) {
//         return <Spinner animation="border" variant="primary" />;
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <div className="container">
//             <h3 style={{marginTop:"10%"}}>All Groups</h3>
//             <Table striped bordered hover responsive className="mt-3">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Group Name</th>
//                         <th>Description</th>
//                         <th>Created By (User ID)</th>
//                         {/* <th>Status</th> */}
//                         <th>Members Count</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {groups.map((group, index) => (
//                         <tr key={group._id}>
//                             <td>{index + 1}</td>
//                             <td>{group.name}</td>
//                             <td>{group.description}</td>
//                             <td>{group.userId}</td>
//                             <td>
//                                 <ul className="mb-0">
//                                     {group.groupMember?.map((member, idx) => (
//                                         <li key={idx} style={{ listStyleType: "disc", marginLeft: "1rem" }}>
//                                             {member.email}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default ViewGroup;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

const ViewGroup = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get("http://localhost:8080/group/mygroups", {
                    withCredentials: true, // 👈 ensures cookie (userId) is sent
                });
                setGroups(res.data.data);
            } catch (err) {
                console.error("Error fetching groups:", err);
                setError("Failed to load your group data");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="container">
            <h3 style={{ marginTop: "10%" }}>My Groups</h3>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Group Name</th>
                        <th>Description</th>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={group._id}>
                            <td>{index + 1}</td>
                            <td>{group.name}</td>
                            <td>{group.description}</td>
                            <td>
                                <ul className="mb-0">
                                    {group.groupMember?.map((member, idx) => (
                                        <li key={idx} style={{ listStyleType: "disc", marginLeft: "1rem" }}>
                                            {member.email}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewGroup;

