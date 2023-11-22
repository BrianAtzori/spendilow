import crypto from "crypto"
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class SpendilowUser {

    public id: string
    public email: string;
    public password: string;
    public savings: string;
    public salary: string;
    public profileImage: string;
    public workfield: string;
    public username: string;

    constructor({ email, password, savings, salary, profileImage, workfield, username }: any) {
        this.id = crypto.randomUUID();
        this.email = email;
        this.password = password;
        this.savings = savings;
        this.salary = salary;
        this.profileImage = profileImage;
        this.workfield = workfield;
        this.username = username;
    }

    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }

    JWTGeneration(mode: string): string {
        switch (mode) {
            case 'access': {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE })
            }
            case 'refresh': {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_REFRESH_LIFE })
            }
            default: {
                return jwt.sign({ id: this.id, email: this.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE })
            }
        }
    }

    pwdCheck(): boolean {
        return true;
    }

}

module.exports = SpendilowUser;