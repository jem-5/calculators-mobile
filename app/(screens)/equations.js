import React, { useEffect, useState } from "react";
import CustomView from "../../components/customView";
import CustomText from "../../components/customText";
import CustomTitle from "../../components/customTitle";
import CustomLine from "../../components/customLine";

import CustomInput from "../../components/customInput";
import { Checkbox } from "react-native-paper";
import allCalculators from "../../data/allCalculators";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import allConstants from "../../data/allConstants";
import useThemeColors from "../../hooks/useThemeColors";
import allEquations from "../../data/allEquations";

export default function Equations() {
  const colors = useThemeColors();

  const displayEquations = () => {
    return allEquations.map((item, i) => {
      return (
        <CustomView
          key={i}
          style={{
            borderWidth: 1,
            borderRadius: 25,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            minWidth: "100%",
            flex: 1,
            borderColor: colors.text.color,
          }}
        >
          <CustomText
            style={{
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {item.name}
          </CustomText>
          <CustomText style={{ alignSelf: "center" }}>
            {item.equation}
          </CustomText>

          <CustomText style={{ fontSize: 16, textAlign: "left" }}>
            <MaterialCommunityIcons name="circle-medium" />
            Application: {item.application}
          </CustomText>
          <CustomText
            style={{
              fontSize: 16,
              textAlign: "left",
            }}
          >
            <MaterialCommunityIcons name="circle-medium" />
            Assumptions: {item.assumptions}
          </CustomText>

          <CustomText style={{ fontSize: 16, textAlign: "left" }}>
            <MaterialCommunityIcons name="circle-medium" />
            Usage: {item.usage}
          </CustomText>
        </CustomView>
      );
    });
  };

  return (
    <CustomView>
      <CustomTitle>Equations</CustomTitle>
      {displayEquations()}
    </CustomView>
  );
}
