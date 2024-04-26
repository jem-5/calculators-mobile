import "expo-dev-client";

import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";
import CustomText from "../components/customText";
import CustomView from "../components/customView";
import CustomTitle from "../components/customTitle";
import CustomLine from "../components/customLine";
import CustomPressable from "../components/customPressable";
import CustomInput from "../components/customInput";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import myAuth from "../auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { useCallback } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  // if (!fontsLoaded) return null;

  const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
      console.log("user index", user);
      if (user) {
        if (!user.isAnonymous) router.navigate("/dashboard");
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const message = findErrorMsg(errorCode);
        setError(message);
        console.log(errorCode);
      });
  };

  const findErrorMsg = (code) => {
    switch (code) {
      case "auth/email-already-exists":
        return "Email already exists";
      case "auth/internal-error":
        return "Internal error";
      case "auth/invalid-credential":
        return "Incorrect email or password";
      case "auth/invalid-display-name":
        return "Display name invalid";
      case "auth/invalid-email":
        return "Email invalid";
      case "auth/user-not-found":
        return "User not found";
      default:
        return "";
    }
  };

  const signInAnonymous = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("User signed in anonymously");
        router.navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CustomView>
      <CustomTitle>CALCULO</CustomTitle>
      <Image source={require("../assets/images/app-pic.png")} />
      <CustomText>
        Perform complex engineering tasks easily. Log in to save your work.
      </CustomText>
      <CustomView
        style={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <CustomView dir="horiz">
          <MaterialIcons name="email" size={30} />
          <CustomInput
            placeholder="Email"
            keyboard="default"
            onChangeText={setEmail}
            value={email}
          />
        </CustomView>
        <CustomView dir="horiz" style={{ alignItems: "center" }}>
          <MaterialIcons name="lock" size={30} />
          <CustomInput
            placeholder="Password"
            onChangeText={setPassword}
            keyboard="default"
            value={password}
            secureTextEntry={!showPassword}
          />

          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={30}
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 5 }}
          />
        </CustomView>

        <CustomPressable
          icon="login"
          onPress={signIn}
          style={{ alignSelf: "center" }}
        >
          Log in
        </CustomPressable>
        {error ? (
          <CustomText style={{ fontSize: 17 }}>{error}</CustomText>
        ) : null}

        <CustomText style={{ fontSize: 17 }}>
          Don't have an account yet?{" "}
          <CustomText
            onPress={() => router.navigate("/signUp")}
            style={{ fontWeight: "bold", fontSize: 17 }}
          >
            Sign up.
          </CustomText>
        </CustomText>
      </CustomView>
      <CustomLine />
      <CustomText>
        Don't want an account? Feel free to browse around!
      </CustomText>
      <CustomPressable icon="calculator" onPress={signInAnonymous}>
        Explore the app
      </CustomPressable>
    </CustomView>
  );
}
