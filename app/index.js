import "expo-dev-client";

import { Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";
import CustomText from "../components/customText";
import CustomView from "../components/customView";
import CustomTitle from "../components/customTitle";
import CustomLine from "../components/customLine";
import CustomPressable from "../components/customPressable";
import CustomInput from "../components/customInput";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import myAuth from "../auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  console.log("myauth", myAuth);
  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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

  return (
    <CustomView>
      <CustomTitle>Calculo App</CustomTitle>
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
        <CustomView dir="horiz">
          <MaterialIcons name="password" size={30} />
          <CustomInput
            placeholder="Password"
            onChangeText={setPassword}
            keyboard="default"
            value={password}
            secureTextEntry={true}
          />
        </CustomView>

        <CustomPressable
          icon="login"
          onPress={signIn}
          style={{ alignSelf: "center" }}
        >
          Log in
        </CustomPressable>
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
