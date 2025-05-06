import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const COLORS = ["#00C49F", "#FF8042"];

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState([
    { name: "Active", value: 0 },
    { name: "Blocked", value: 0 },
  ]);
  const [monthlyEvents, setMonthlyEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/adminCrud/users/stats") // Adjust endpoint as needed
      .then((res) => res.json())
      .then((data) => {
        setUserStats([
          { name: "Active", value: data.activeUsers },
          { name: "Blocked", value: data.blockedUsers },
        ]);
        setMonthlyEvents(data.eventsPerMonth);
      })
      .catch((err) => console.error("Error loading dashboard stats", err));
  }, []);

  return (
    <Box sx={{ marginTop:"7%" ,display: "flex", gap: 4, flexWrap: "wrap", p: 3 }}>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Status Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userStats}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {userStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Events
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyEvents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
