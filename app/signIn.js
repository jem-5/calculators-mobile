import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomView from "../components/customView";
import CustomInput from "../components/customInput";
import CustomPressable from "../components/customPressable";
import CustomText from "../components/customText";

export default function signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <CustomView>
      <CustomInput
        placeholder="Email"
        keyboard="default"
        onChangeText={setEmail}
        value={email}
      />
      <CustomInput
        placeholder="Password"
        onChangeText={setPassword}
        keyboard="default"
        value={email}
      />
      <CustomPressable>
        <CustomText>Submit</CustomText>
      </CustomPressable>
    </CustomView>
  );
}
