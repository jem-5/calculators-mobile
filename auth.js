import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, getApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCmvg1Q3vtlpxrKi4A3lh_6oVZfTWaO2Fc",
  authDomain: "calculators-30db4.firebaseapp.com",
  databaseURL: "https://calculators-30db4.firebaseio.com",
  projectId: "calculators-30db4",
  storageBucket: "calculators-30db4.appspot.com",
  messagingSenderId: "967573839324",
  appId: "1:967573839324:android:28adc6d60828ab2dd80319",
  measurementId: "G-measurement-id",
};

let app;
let auth;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  // console.log("OLD auth app ones");
  app = getApp();
}

// console.log(app);
// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

export default auth;
