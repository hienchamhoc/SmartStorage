const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions
    .region('asia-southeast1')
    .database
    .ref('/storage1/')
    .onWrite((snapshot, context) => {


        var humidity = snapshot.after._data.humidity;
        var temperature = snapshot.after._data.temperature;
        if ((temperature < -20) || (temperature > 20) || (humidity < 50) || (humidity > 90)) {
            const payload = {
                notification: {
                    title: 'Cảnh báo nhiệt độ hoặc độ ẩm bất thường',
                    body: 'Nhiệt độ: '
                        + temperature
                        + '°C, độ ẩm: '
                        + humidity
                        + '%',
                }
            };
            var toPic = "warning";
            return admin.messaging().sendToTopic(toPic, payload).then(res => {
                console.log('warning sent ')
            }).catch(err => {
                console.log('warning sent ' + err)
            })
        }
    })