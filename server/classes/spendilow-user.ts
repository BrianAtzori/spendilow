// const crypto = require("crypto");
import Crypto from "crypto"

class SpendilowUser {

    public id: string
    public email: string;
    public password: string;
    public savings: string;
    public salary: string;
    public profileImage: string;
    public workfield: string;
    public username: string;

    constructor({email, password, savings, salary, profileImage,workfield, username}: any) {
        this.id = Crypto.randomUUID();
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