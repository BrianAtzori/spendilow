"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    if (!requestId) {
        throw new BadRequestError("Il profilo cercato non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const userProfile = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.params.id);
    if (!userProfile) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const { id, email, isMFAActive, savings, salary, profileimage, workfield, username, } = userProfile;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        id,
        email,
        isMFAActive,
        savings,
        salary,
        profileimage,
        workfield,
        username,
    });
});
// ------ Exports ------
module.exports = {
    getUserProfile,
};
