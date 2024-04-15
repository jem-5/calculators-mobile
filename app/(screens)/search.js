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

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState({
    Chemistry: true,
    Physics: true,
    "Fluid Mechanics": true,
    "Heat Transfer": true,
  });
  const [filteredCalculators, setFilteredCalculators] = useState([]);

  const popularCalculators = [
    "momentum",
    "thermal resistance",
    "stopping distance",
    "electrons",
    "ideal gas",
    "hydraulic radius",
  ];

  useEffect(() => {
    const selectedCategories = Object.keys(categories).filter(
      (item) => categories[item] === true
    );
    let resultingCalcs = allCalculators.filter((item) =>
      selectedCategories.includes(item.category)
    );
    if (searchTerm) {
      const searchedCalcs = resultingCalcs.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.paragraph.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.slogan.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCalculators(searchedCalcs);
    }
  }, [categories, searchTerm]);

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
          }}
        >
          <Ionicons
            name="calculator"
            style={{ fontSize: 30, verticalAlign: "middle" }}
          />
          <CustomText key={i} onPress={() => router.navigate(item.link)}>
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
        Find a calculator
      </CustomTitle>
      <CustomInput
        value={searchTerm}
        placeholder="Find something specific..."
        style={{ width: "90%" }}
        keyboardType="default"
        onChangeText={setSearchTerm}
      />
      <CustomText style={{ fontSize: 18, alignSelf: "flex-start" }}>
        Popular Search Terms
      </CustomText>

      <CustomView
        dir="horiz"
        style={{
          alignSelf: "center",
          width: "100%",
          margin: 0,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {popularCalculators.map((item, i) => {
          return (
            <CustomText
              key={i}
              onPress={() => setSearchTerm(item)}
              style={{
                backgroundColor: "rgb(41, 214, 252)",
                padding: 5,
                borderRadius: 10,
                alignSelf: "center",
                fontSize: 16,
              }}
            >
              {item}
            </CustomText>
          );
        })}
      </CustomView>
      <CustomText style={{ fontSize: 18, alignSelf: "flex-start" }}>
        Categories
      </CustomText>
      <CustomView
        dir="horiz"
        style={{
          alignSelf: "center",
          width: "90%",
          margin: 0,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 0,
          backgroundColor: "white",
          borderRadius: 25,
        }}
      >
        <Checkbox.Item
          status={categories.Chemistry ? "checked" : "unchecked"}
          onPress={() => {
            setCategories({
              ...categories,
              Chemistry: !categories.Chemistry,
            });
          }}
          position="leading"
          label="Chemistry"
          color="rgb(41, 214, 252)"
        />
        <Checkbox.Item
          status={categories.Physics ? "checked" : "unchecked"}
          onPress={() => {
            setCategories({
              ...categories,
              Physics: !categories.Physics,
            });
          }}
          label="Physics"
          position="leading"
          color="rgb(41, 214, 252)"
        />
        <Checkbox.Item
          status={categories["Fluid Mechanics"] ? "checked" : "unchecked"}
          onPress={() => {
            setCategories({
              ...categories,
              "Fluid Mechanics": !categories["Fluid Mechanics"],
            });
          }}
          label="Fluid Mechanics"
          position="leading"
          color="rgb(41, 214, 252)"
        />
        <Checkbox.Item
          status={categories["Heat Transfer"] ? "checked" : "unchecked"}
          onPress={() => {
            setCategories({
              ...categories,
              "Heat Transfer": !categories["Heat Transfer"],
            });
          }}
          label="Heat Transfer"
          position="leading"
          color="rgb(41, 214, 252)"
        />
      </CustomView>
      <CustomLine />
      <CustomText style={{ fontSize: 18, alignSelf: "flex-start" }}>
        Results
      </CustomText>
      {displayCalculators()}
    </CustomView>
  );
}
