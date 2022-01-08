var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const registrationTokens = [
    'enQ3XUOORB2-YfUbKqUAVN:APA91bELJ_7xZE3ourPYOeGaspuicqlhwHzVXPmhSlIPwNJh-a6z5uAWShXqsabnYh6WSPVNeYA4lVr2rLqTyRx0v6q6lj1k_hLUhEQ0CkewYxpnIn3JRCaBYs1RTVtSoGv5aXKyvJxu',
    'enQ3XUOORB2-YfUbKqUAVN:APA91bELJ_7xZE3ourPYOeGaspuicqlhwHzVXPmhSlIPwNJh-a6z5uAWShXqsabnYh6WSPVNeYA4lVr2rLqTyRx0v6q6lj1k_hLUhEQ0CkewYxpnIn3JRCaBYs1RTVtSoGv5aXKyvJxu',
];

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
    admin.messaging().sendToDevice(registrationTokens, message, options)
        .then((response) => {
            console.log(response.successCount + ' messages were sent successfully');
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports.sendToDevice = sendToDevice;