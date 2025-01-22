"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
// Define the port (default to 3000 if not specified in environment variables)
const PORT = process.env.PORT || 3000;
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World! This is an Express app with TypeScript!');
});
// Middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for testing or further integration
exports.default = app;
