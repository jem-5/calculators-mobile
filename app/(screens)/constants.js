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

export default function Constants() {
  const colors = useThemeColors();

  const displayConstants = () => {
    return allConstants.map((item, i) => {
      return (
        <CustomView
          key={i}
          style={{
            borderWidth: 1,
            borderRadius: 25,
            alignItems: "flex-start",
            minWidth: "100%",
            borderColor: colors.text.color,
          }}
        >
          <CustomText style={{ fontWeight: "bold", alignSelf: "center" }}>
            {item.name}
          </CustomText>
          <CustomText style={{ fontSize: 16 }}>
            <MaterialCommunityIcons name="circle-medium" />
            Value: {Number(item.value).toExponential()} {item.unit}
          </CustomText>
          <CustomText
            style={{
              fontSize: 16,
              alignSelf: "flex-start",
              textAlign: "left",
            }}
          >
            <MaterialCommunityIcons name="circle-medium" />
            Usage: {item.description}
          </CustomText>
        </CustomView>
      );
    });
  };

  return (
    <CustomView>
      <CustomTitle>Constants</CustomTitle>
      {displayConstants()}
    </CustomView>
  );
}
