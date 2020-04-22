import *as React from 'react';
import {
    View,
    Text
} from 'react-native';
import firebase from 'react-native-firebase';



export default class HomeScreen extends React.Component {
    async componentDidMount() {
        const enabled = await firebase.messaging().hasPermission();

        console.log(enabled)
        if (enabled) {
            const fcmToken = await firebase.messaging().getToken();
            console.log(fcmToken + "...fcmToken");

            firebase.notifications().onNotification(notification => {
                console.log(notification)
                alert('Got a notification');
            })
        } else {
            try {
                firebase.messaging().requestPermission();
            } catch (e) {
                alert('user rejected the permissions');
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center' }}>
                    Hello
                </Text>
            </View>
        )
    }
}