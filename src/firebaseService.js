var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

var androidToken = require("../config/androidToken.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// let message = {
//     notification: {
//         title: "mytitle",
//         body: "mybody"
//     }
// };
let options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

function sendToDevice(message) {
    admin.messaging().sendToDevice(androidToken.registrationTokens, message, options)
        .then((response) => {
            console.log(response.successCount + ' messages were sent successfully');
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports.sendToDevice = sendToDevice;