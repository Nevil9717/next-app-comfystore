// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCdM4GLrb-rtbFLG7albdccGci7td61GnQ",
  authDomain: "ecommerce-24635.firebaseapp.com",
  projectId: "ecommerce-24635",
  storageBucket: "ecommerce-24635.appspot.com",
  messagingSenderId: "169621713670",
  appId: "1:169621713670:web:a952d8f24c5c5622dce487",
  measurementId: "G-1BFS3CKRLD",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
