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
import allGreekLetters from "../../data/allLetters";

export default function GreekLetters() {
  const colors = useThemeColors();

  const displayLetters = () => {
    return allGreekLetters.map((item, i) => {
      return (
        <CustomView
          key={i}
          style={{
            borderWidth: 1,
            borderRadius: 25,
            minWidth: "100%",
            borderColor: colors.text.color,
          }}
        >
          <CustomText style={{ fontWeight: "bold", alignSelf: "center" }}>
            {item.name}
          </CustomText>
          {item.description.map((element, i) => {
            return (
              <CustomView dir="horiz" key={i}>
                <CustomText
                  style={{
                    fontSize: 15,
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <MaterialCommunityIcons name="circle-medium" />
                  {element}
                </CustomText>
              </CustomView>
            );
          })}
        </CustomView>
      );
    });
  };

  return (
    <CustomView>
      <CustomTitle>Greek Letters</CustomTitle>
      {displayLetters()}
    </CustomView>
  );
}
