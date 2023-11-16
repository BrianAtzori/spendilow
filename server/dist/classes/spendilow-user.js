"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const crypto = require("crypto");
const crypto_1 = __importDefault(require("crypto"));
class SpendilowUser {
    constructor({ email, password, savings, salary, profileImage, workfield, username }) {
        this.id = crypto_1.default.randomUUID();
        this.email = email;
        this.password = password;
        this.savings = savings;
        this.salary = salary;
        this.profileImage = profileImage;
        this.workfield = workfield;
        this.username = username;
    }
}
module.exports = SpendilowUser;
