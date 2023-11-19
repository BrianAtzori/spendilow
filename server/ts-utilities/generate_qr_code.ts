const speakeasyQR = require("speakeasy");
const QRCode = require("qrcode");

// Generate a secret key
const secret = speakeasyQR.generateSecret({ length: 20 });

// Function to generate a QR code URL for Google Authenticator
function generateQRCodeURL() {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(secret.otpauth_url, (err: any, dataURL: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(dataURL);
            }
        });
    });
}

function qrGenerationAndOutput() {
    // Generate and display the QR code URL
    generateQRCodeURL()
        .then((dataURL) => {
            console.log("Scan the QR code with the Google Authenticator app:");
            console.log(dataURL);
        })
        .catch((err) => {
            console.error("Error generating QR code:", err);
        });
}

module.exports = qrGenerationAndOutput;

