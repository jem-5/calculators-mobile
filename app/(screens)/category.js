import React, { useEffect, useState } from "react";
import CustomView from "../../components/customView";
import CustomText from "../../components/customText";
import CustomTitle from "../../components/customTitle";
import CustomLine from "../../components/customLine";

import CustomInput from "../../components/customInput";
import { Checkbox } from "react-native-paper";
import allCalculators from "../../data/allCalculators";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Category({ category, updateModal }) {
  const filteredCalculators = allCalculators.filter((item, i) => {
    return item.category === category;
  });

  console.log(updateModal);

  const displayCalculators = () => {
    return filteredCalculators.map((item, i) => {
      return (
        <CustomView
          dir="horiz"
          key={i}
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-start",
            borderWidth: 1,
            borderColor: "black",
            marginBottom: 5,
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Ionicons
            name="calculator"
            style={{ fontSize: 30, verticalAlign: "middle" }}
          />
          <CustomText
            key={i}
            onPress={() => {
              updateModal();
              router.navigate(item.link);
            }}
          >
            {item.title}
          </CustomText>
        </CustomView>
      );
    });
  };

  return (
    <CustomView>
      <CustomTitle
        style={{ alignSelf: "flex-start", fontSize: 22, marginTop: 5 }}
      >
        {category} Calculators:
      </CustomTitle>

      <CustomLine />
      <CustomText style={{ fontSize: 18, alignSelf: "flex-start" }}>
        Results
      </CustomText>
      {displayCalculators()}
    </CustomView>
  );
}
