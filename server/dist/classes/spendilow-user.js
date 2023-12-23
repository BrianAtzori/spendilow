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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class SpendilowUser {
    constructor({ id, email, password, isMFAActive, savings, salary, profileImage, workfield, username }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.savings = savings;
        this.salary = salary;
        this.profileImage = profileImage;
        this.workfield = workfield;
        this.username = username;
        this.isMFAActive = isMFAActive;
    }
    idGeneration() {
        return crypto_1.default.randomUUID();
    }
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(10);
            this.password = yield bcrypt.hash(this.password, salt);
        });
    }
    JWTGeneration(mode) {
        switch (mode) {
            case 'access': {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
            }
            case 'refresh': {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_REFRESH_LIFE });
            }
            default: {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
            }
        }
    }
    pwdCheck(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAttemptMatching = yield bcrypt.compare(attempt, this.password);
            return isAttemptMatching;
        });
    }
}
module.exports = SpendilowUser;
