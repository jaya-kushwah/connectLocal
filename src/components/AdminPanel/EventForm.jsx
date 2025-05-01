import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    InputAdornment,
    IconButton,
    Card,
    CardMedia,
    FormHelperText,
} from "@mui/material";
import {
    Image,
    CalendarToday,
    LocationOn,
    People,
    MonetizationOn,
    Close,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    // maxWidth: 1000,
    width:"95%",
    margin: "auto",
    marginTop:"6%",
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
    background: theme.palette.background.paper,
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "12px",
    padding: theme.spacing(1.5, 3),
    textTransform: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
}));

const ImageUploadCard = styled(Card)(({ theme }) => ({
    width: 180,
    height: 120,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    border: `2px dashed ${theme.palette.divider}`,
    "&:hover": {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
}));

const EventCreationForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        eventTitle: "",
        description: "",
        eventStartDate: null,
        eventEndDate: null,
        location: "",
        slots: "",
        ticketPrice: "",
        eventImage: null,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                enqueueSnackbar("Image size should be less than 5MB", {
                    variant: "warning",
                });
                return;
            }
            setFormData((prev) => ({ ...prev, eventImage: file }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.eventTitle) newErrors.eventTitle = "Event title is required";
        if (!formData.eventStartDate) newErrors.eventStartDate = "Start date is required";
        if (!formData.eventEndDate) newErrors.eventEndDate = "End date is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.slots) newErrors.slots = "Slots are required";
        if (formData.ticketPrice === "") newErrors.ticketPrice = "Ticket price is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("eventTitle", formData.eventTitle);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("eventStartDate", formData.eventStartDate.toISOString());
            formDataToSend.append("eventEndDate", formData.eventEndDate.toISOString());
            formDataToSend.append("location", formData.location);
            formDataToSend.append("slots", formData.slots);
            formDataToSend.append("ticketPrice", formData.ticketPrice);
            if (formData.eventImage) {
                formDataToSend.append("eventImage", formData.eventImage);
            }

            const response = await fetch("http://localhost:8080/event/addEvent", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            enqueueSnackbar("Event created successfully!", { variant: "success" });

            // Reset form
            setFormData({
                eventTitle: "",
                description: "",
                eventStartDate: null,
                eventEndDate: null,
                location: "",
                slots: "",
                ticketPrice: "",
                eventImage: null,
            });
        } catch (error) {
            console.error("Error creating event:", error);
            enqueueSnackbar("Failed to create event. Please try again.", {
                variant: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledPaper sx={{  mb: 4 }}>
                <Box sx={{ mb: 4, ml: "252px" }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Create New Event
                    </Typography>
                    <Typography color="text.secondary">
                        Fill in the details below to create your event
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Event Image */}
                        <Grid item xs={12}>
                            <SectionHeader variant="h6">
                                <Image fontSize="small" /> Event Image
                            </SectionHeader>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                {formData.eventImage ? (
                                    <Box sx={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            image={URL.createObjectURL(formData.eventImage)}
                                            sx={{
                                                width: 180,
                                                height: 120,
                                                borderRadius: "12px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: -10,
                                                right: -10,
                                                backgroundColor: "error.main",
                                                color: "common.white",
                                                "&:hover": {
                                                    backgroundColor: "error.dark",
                                                },
                                            }}
                                            onClick={() =>
                                                setFormData((prev) => ({ ...prev, eventImage: null }))
                                            }
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <>
                                        <input
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id="event-image-upload"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="event-image-upload">
                                            <ImageUploadCard>
                                                <Box textAlign="center">
                                                    <Image color="action" />
                                                    <Typography variant="caption" display="block">
                                                        Upload Image
                                                    </Typography>
                                                </Box>
                                            </ImageUploadCard>
                                        </label>
                                    </>
                                )}
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Upload a high-quality image that represents your event.
                                        Recommended size: 800x600px (Max 5MB)
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Event Title */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Event Title *"
                                name="eventTitle"
                                value={formData.eventTitle}
                                onChange={handleChange}
                                variant="outlined"
                                size="medium"
                                error={!!errors.eventTitle}
                                helperText={errors.eventTitle}
                                InputProps={{
                                    sx: { borderRadius: "12px" },
                                }}
                            />
                        </Grid>

                        {/* Dates */}
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Start Date *"
                                value={formData.eventStartDate}
                                onChange={(newValue) =>
                                    setFormData((prev) => ({ ...prev, eventStartDate: newValue }))
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        error: !!errors.eventStartDate,
                                        helperText: errors.eventStartDate,
                                        InputProps: {
                                            sx: { borderRadius: "12px" },
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarToday color="action" />
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="End Date *"
                                value={formData.eventEndDate}
                                onChange={(newValue) =>
                                    setFormData((prev) => ({ ...prev, eventEndDate: newValue }))
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        error: !!errors.eventEndDate,
                                        helperText: errors.eventEndDate,
                                        InputProps: {
                                            sx: { borderRadius: "12px" },
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarToday color="action" />
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Tell attendees what your event is about..."
                                InputProps={{
                                    sx: { borderRadius: "12px" },
                                }}
                            />
                        </Grid>

                        {/* Location */}
                        <Grid item xs={12}>
                            <SectionHeader variant="h6">
                                <LocationOn fontSize="small" /> Location
                            </SectionHeader>
                            <TextField
                                fullWidth
                                label="Location *"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                variant="outlined"
                                error={!!errors.location}
                                helperText={errors.location}
                                placeholder="Venue name, address, or meeting point"
                                InputProps={{
                                    sx: { borderRadius: "12px" },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Pricing and Capacity */}
                        <Grid item xs={12} md={6}>
                            <SectionHeader variant="h6">
                                <MonetizationOn fontSize="small" /> Pricing
                            </SectionHeader>
                            <TextField
                                fullWidth
                                label="Ticket Price ($) *"
                                name="ticketPrice"
                                type="number"
                                value={formData.ticketPrice}
                                onChange={handleChange}
                                inputProps={{ min: 0, step: 0.01 }}
                                error={!!errors.ticketPrice}
                                helperText={errors.ticketPrice}
                                InputProps={{
                                    sx: { borderRadius: "12px" },
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SectionHeader variant="h6">
                                <People fontSize="small" /> Capacity
                            </SectionHeader>
                            <TextField
                                fullWidth
                                label="Maximum Slots *"
                                name="slots"
                                type="number"
                                value={formData.slots}
                                onChange={handleChange}
                                inputProps={{ min: 1 }}
                                error={!!errors.slots}
                                helperText={errors.slots}
                                InputProps={{
                                    sx: { borderRadius: "12px" },
                                }}
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
                                <StyledButton
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ width: { xs: "100%", sm: "auto" } }}
                                >
                                    {isSubmitting ? "Creating Event..." : "Create Event"}
                                </StyledButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
        </LocalizationProvider>
    );
};

export default EventCreationForm;