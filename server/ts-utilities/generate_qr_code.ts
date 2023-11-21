const QRCode = require("qrcode");

function generateQRCodeURL() {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(process.env.MFA_SEC, (err: any, dataURL: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(dataURL);
            }
        });
    });
}

async function qrGenerationAndOutput() {
    let generatedQR: any = await generateQRCodeURL()
        .then((dataURL) => {
            return dataURL
        })
        .catch((error) => {
            throw new Error(`Errore nell'attivare l'autenticazione a due fattori, contatta il supporto utente. ERR: ${error}`)
        });

    return generatedQR
}

module.exports = qrGenerationAndOutput;

