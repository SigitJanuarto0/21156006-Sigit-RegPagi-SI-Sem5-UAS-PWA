importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const config = {
    apiKey: "AIzaSyCOrj0MiGwNjTn1wiGlyqx9LV-znCmi_mI",
    authDomain: "notifikasiv1.firebaseapp.com",
    projectId: "notifikasiv1",
    storageBucket: "notifikasiv1.appspot.com",
    messagingSenderId: "395001630450",
    appId: "1:395001630450:web:4f55d08527e6dc83844a6b",
    measurementId: "G-MYZ0PDQ2GR"
  };

firebase.initializeApp({
  messagingSenderId: '395001630450'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});