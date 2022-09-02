/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {

        // Remove the notification
        await notifee.cancelNotification(notification.id);
    }
});

//Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {


//     console.log('Message handled in the background!hien', remoteMessage);
//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         android: {
//             channelId,
//             smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
//             // pressAction is needed if you want the notification to open the app when pressed
//             pressAction: {
//                 id: 'default',
//             },
//         },
//     })

// });


messaging()
    .subscribeToTopic('warning')
    .then(() => console.log('Subscribed to topic!'));

AppRegistry.registerComponent(appName, () => App);
