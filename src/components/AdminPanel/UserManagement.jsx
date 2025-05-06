import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    CircularProgress,
    Box,
    Typography,
} from "@mui/material";
import {
    Search,
    FilterList,
    Block,
    LockOpen,
    Edit,
    Delete,
    Refresh,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [blockDialogOpen, setBlockDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        location: "",
    });


    // Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/adminCrud/");
            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message || "Failed to fetch users");

            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on search and status
    useEffect(() => {
        let result = users;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(term) ||
                    user.email.toLowerCase().includes(term) ||
                    user._id.toString().includes(term)
            );
        }

        if (statusFilter !== "all") {
            result = result.filter((user) => user.status === statusFilter);
        }

        setFilteredUsers(result);
    }, [searchTerm, statusFilter, users]);

    // Toggle user block status
    const handleToggleBlock = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/adminCrud/${selectedUser._id}/block`,
                {
                    method: "PATCH",
                }
            );
            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message || "Failed to update user status");

            setUsers(
                users.map((user) =>
                    user._id === selectedUser._id
                        ? {
                            ...user,
                            status: user.status === "active" ? "blocked" : "active",
                        }
                        : user
                )
            );

            enqueueSnackbar(
                `User ${selectedUser.status === "active" ? "blocked" : "unblocked"
                } successfully`,
                { variant: "success" }
            );
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        } finally {
            setBlockDialogOpen(false);
        }
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const submitEditForm = async () => {
        try {
            const response = await fetch(`http://localhost:8080/adminCrud/${selectedUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editForm),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Failed to update user");

            enqueueSnackbar("User updated successfully", { variant: "success" });
            setEditDialogOpen(false);
            fetchUsers(); // refresh list
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };


    // Delete user
    const handleDeleteUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/adminCrud/${selectedUser._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to delete user");
            }

            setUsers(users.filter((user) => user._id !== selectedUser._id));
            enqueueSnackbar("User deleted successfully", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography style={{ marginTop: "7%" }} variant="h4">User Management</Typography>
                <Button style={{ marginTop: "7%" }} variant="outlined" startIcon={<Refresh />} onClick={fetchUsers}>
                    Refresh
                </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: <Search sx={{ mr: 1 }} />,
                    }}
                    sx={{ width: 300 }}
                />

                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    size="small"
                    sx={{ minWidth: 150 }}
                    startAdornment={<FilterList />}
                >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                </Select>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "primary.main" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>User</TableCell>
                                <TableCell sx={{ color: "white" }}>Email</TableCell>
                                <TableCell sx={{ color: "white" }}>Location</TableCell>
                                <TableCell sx={{ color: "white" }}>Status</TableCell>
                                <TableCell sx={{ color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <Box
                                                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                                            >
                                                <Avatar src={user.avatar} alt={user.name} />
                                                {user.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.location}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status}
                                                color={user.status === "active" ? "success" : "error"}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setEditForm({
                                                                name: user.name,
                                                                email: user.email,
                                                                location: user.location,
                                                                status: user.status || "active"
                                                            });
                                                            setEditDialogOpen(true);
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>


                                                <Tooltip
                                                    title={user.status === "active" ? "Block" : "Unblock"}
                                                >
                                                    <IconButton
                                                        color={
                                                            user.status === "active" ? "error" : "success"
                                                        }
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setBlockDialogOpen(true);
                                                        }}
                                                    >
                                                        {user.status === "active" ? (
                                                            <Block />
                                                        ) : (
                                                            <LockOpen />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Block/Unblock Confirmation Dialog */}
            <Dialog open={blockDialogOpen} onClose={() => setBlockDialogOpen(false)}>
                <DialogTitle>
                    {selectedUser?.status === "active" ? "Block User" : "Unblock User"}
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to{" "}
                    {selectedUser?.status === "active" ? "block" : "unblock"}{" "}
                    {selectedUser?.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBlockDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleToggleBlock}
                        color={selectedUser?.status === "active" ? "error" : "success"}
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)", // for Safari
                marginTop: "5%",
            }} open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={editForm.location}
                        onChange={handleEditChange}
                        margin="dense"
                    />
                    <Select
                        fullWidth
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        margin="dense"
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="blocked">Blocked</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={submitEditForm} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    Are you sure you want to permanently delete {selectedUser?.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserManagement;