"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var authMiddleware = function (req, res, next) {
    try {
        var token = req.cookies.token;
        if (!token) {
            res.status(401).send({ success: false, message: 'Authentication required' });
            return;
        }
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECKEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ success: false, message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
