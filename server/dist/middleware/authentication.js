"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { StatusCodes } from "http-status-codes"
// const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const accessToken = req.cookies['spendilow-access-token'];
    const refreshToken = req.cookies['spendilow-refresh-token'];
    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JW_SEC);
        req.body = { email: decoded.email, id: decoded.id };
        console.log(req.body);
        next();
    }
    catch (error) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.JW_SEC);
            const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
            res
                .cookie('spendilow-refresh-token', refreshToken, { httpOnly: true, })
                .cookie('spendilow-access-token', accessToken)
                .send(decoded.user);
        }
        catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }
};
module.exports = auth;
