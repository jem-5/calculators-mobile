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
import allConversions from "../../data/allConversions";

export default function Conversions() {
  const colors = useThemeColors();

  const displayConversions = () => {
    return allConversions.map((item, i) => {
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
            {item.icon} {item.name}
          </CustomText>
          {item.conversions.map((element, i) => {
            return (
              <CustomText key={i} style={{ fontSize: 15 }}>
                <MaterialCommunityIcons name="circle-medium" />
                {element}
              </CustomText>
            );
          })}
        </CustomView>
      );
    });
  };

  return (
    <CustomView>
      <CustomTitle>Conversions</CustomTitle>
      {displayConversions()}
    </CustomView>
  );
}
