const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// API-Football credentials
const API_KEY = "3598968c65d12200b3e3282615b71daa";
const API_HOST = "v3.football.api-sports.io";

// Endpoint to fetch team info
app.get("/api/teams", async (req, res) => {
    try {
        const teamName = req.query.name;
        if (!teamName) {
            return res.status(400).json({ error: "Team name is required" });
        }

        const response = await axios.get(`https://${API_HOST}/teams`, {
            params: { name: teamName },
            headers: {
                "x-apisports-key": API_KEY,
                "x-apisports-host": API_HOST
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching team data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
