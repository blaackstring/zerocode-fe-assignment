"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var authRoute_1 = require("./routes/authRoute");
var cookie_parser_1 = require("cookie-parser");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Example Route
app.get('/api/v1/auth', authRoute_1.default);
// Start Server
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server listening on http://localhost:".concat(PORT));
});
