"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class SpendilowTransaction {
    constructor({ id, user_id, amount, transaction_date, title, notes, tags, transaction_type, target_id, }) {
        this.id = id;
        this.user_id = user_id;
        this.amount = amount;
        this.transaction_date = transaction_date;
        this.title = title;
        this.notes = notes;
        this.tags = tags;
        this.transaction_type = transaction_type;
        this.target_id = target_id;
    }
    idGeneration() {
        return crypto_1.default.randomUUID();
    }
}
module.exports = SpendilowTransaction;
