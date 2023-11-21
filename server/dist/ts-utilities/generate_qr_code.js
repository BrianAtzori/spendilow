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
const QRCode = require("qrcode");
function generateQRCodeURL() {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(process.env.MFA_SEC, (err, dataURL) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(dataURL);
            }
        });
    });
}
function qrGenerationAndOutput() {
    return __awaiter(this, void 0, void 0, function* () {
        let generatedQR = yield generateQRCodeURL()
            .then((dataURL) => {
            return dataURL;
        })
            .catch((error) => {
            throw new Error(`Errore nell'attivare l'autenticazione a due fattori, contatta il supporto utente. ERR: ${error}`);
        });
        return generatedQR;
    });
}
module.exports = qrGenerationAndOutput;
