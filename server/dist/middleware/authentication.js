"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jwt = require("jsonwebtoken");
//------ MIDDLEWARE ------
const auth = (req, res, next) => {
    const accessToken = req.cookies["spendilow-access-token"];
    const refreshToken = req.cookies["spendilow-refresh-token"];
    if (!accessToken && !refreshToken) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .send("Accesso negato. Non è stato fornito alcun token, riprovare ad effettuare il login o contattare il supporto.");
    }
    try {
        const decodedData = jwt.verify(accessToken, process.env.JW_SEC);
        req.user = { id: decodedData.id, email: decodedData.email };
        next();
    }
    catch (error) {
        if (!refreshToken) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send("Accesso negato. Non è stato fornito alcun token di refresh, riprovare ad effettuare il login o contattare il supporto.");
        }
        try {
            const decodedData = jwt.verify(refreshToken, process.env.JW_SEC);
            const accessToken = jwt.sign({ id: decodedData.id, email: decodedData.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
            res
                .cookie("spendilow-refresh-token", refreshToken, {
                httpOnly: true,
                maxAge: 518400000,
                sameSite: "none",
                secure: true,
            })
                .cookie("spendilow-access-token", accessToken, {
                httpOnly: true,
                maxAge: 21600000,
                sameSite: "none",
                secure: true,
            })
                .send(decodedData.user);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send("Accesso negato. Non è stato fornito alcun token, riprovare ad effettuare il login o contattare il supporto.");
        }
    }
};
module.exports = auth;
