import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import CustomView from "../components/customView";
import CustomInput from "../components/customInput";
import CustomPressable from "../components/customPressable";
import CustomText from "../components/customText";
import { router } from "expo-router";
import CustomTitle from "../components/customTitle";
import { MaterialIcons } from "@expo/vector-icons";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        });
        // console.log(user);
        router.navigate("/(screens)/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <CustomView
      style={{
        width: "100%",
        alignItems: "stretch",
        alignSelf: "flex-start",
        paddingTop: 0,
      }}
    >
      <CustomTitle style={{ fontSize: 20 }}>Create an account</CustomTitle>

      <CustomView dir="horiz">
        <MaterialIcons name="account-circle" size={30} />
        <CustomInput
          placeholder="Name"
          keyboard="default"
          onChangeText={setName}
          value={name}
        />
      </CustomView>

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
      <CustomPressable onPress={signUp} style={{ alignSelf: "center" }}>
        <CustomText>Submit</CustomText>
      </CustomPressable>
    </CustomView>
  );
}
