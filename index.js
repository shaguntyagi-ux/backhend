import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",           // sab frontend allow kar do
  methods: "GET,POST",   // jo methods chahiye wo allow
  credentials: true
}));

// Simple news route
app.get("/news/:category", async (req, res) => {
  const { category } = req.params;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 3;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.key}&page=${page}&pageSize=${pageSize}`;

  try {
    
    const response = await axios.get(url);

    res.json(response.data,
      
    );
   
      
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch API data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});