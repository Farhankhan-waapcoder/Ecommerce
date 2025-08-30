const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create axios instance for the backend API
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Proxy middleware
const proxyRequest = async (req, res, next) => {
  try {
    // Forward the token if present
    const token = req.headers.authorization;
    const headers = token ? { Authorization: token } : {};

    // Remove `/api` prefix before forwarding
    const targetUrl = req.originalUrl.replace(/^\/api/, '');

    // Make the request to the backend
    const response = await apiClient({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers,
    });

    res.json(response.data);
  } catch (error) {
    console.log(error);
    
    res.status(error.response?.status || 500).json({
      status: 'error',
      message: error.response?.data?.message || 'Internal server error',
    });
  }
};

// Catch-all proxy route
app.all(/^\/api\/.*/, proxyRequest);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
