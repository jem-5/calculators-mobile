import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";

import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView, View, Text } from "react-native";
import CustomPressable from "../../components/customPressable";
import massUnits from "../../utils/units";
import { convertMassToLbs } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function HeatCapacity() {
  const [mass, setMass] = useState("10");
  const [massUnit, setMassUnit] = useState("pounds (lb)");
  const [material, setMaterial] = useState("Water");
  const [heatCapacity, setHeatCapacity] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const specificHeatOptions = useMemo(() => {
    return {
      Water: 1.0,
      Air: 0.24,
      Aluminum: 0.22,
      Copper: 0.092,
      Iron: 0.11,
      Lead: 0.031,
      Mercury: 0.033,
      Gold: 0.032,
      Silver: 0.056,
      Ethanol: 0.59,
      Glycerol: 0.57,
      Methanol: 0.61,
      Ammonia: 0.52,
      Hydrogen: 3.41,
      Helium: 1.24,
      "Carbon Dioxide": 0.217,
      Oxygen: 0.218,
      Nitrogen: 0.248,
    };
  }, []);

  let specificHeats = [];
  Object.keys(specificHeatOptions).forEach((item, i) => {
    specificHeats.push({
      label: item,
      value: item,
    });
  });

  useEffect(() => {
    const convertedMass = convertMassToLbs(+mass, massUnit);
    const heatCap = +specificHeatOptions[material] * +convertedMass;
    setHeatCapacity(heatCap.toFixed(3));
  }, [mass, massUnit, specificHeatOptions, material]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Heat Capacity</CustomTitle>
        <CustomFavorite name="heatCapacity" />
      </CustomView>
      <CustomText>Determine the ability of a body to absorb heat.</CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Mass"
            onChangeText={setMass}
            value={mass}
            theme={{
              colors: {
                text: "white",
              },
            }}
          />
          <CustomPicker
            onValueChange={(value) => {
              setMassUnit(value);
            }}
            value={massUnit}
            items={massUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz" style={{ justifyContent: "center" }}>
          <CustomPicker
            onValueChange={(value) => {
              setMaterial(value);
            }}
            value={material}
            items={specificHeats}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {heatCapacity ? (
        <View>
          <CustomText>
            Specific Heat: {specificHeatOptions[material]} Btu/(lb*F)
          </CustomText>
          <CustomText>Heat Capacity: {heatCapacity} Btu/F</CustomText>
        </View>
      ) : null}

      <CustomPressable
        icon="bulb1"
        onPress={() => setModalVisible(!modalVisible)}
      >
        Learn more
      </CustomPressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CustomView style={{ flex: 1 }}>
          <ScrollView>
            <CustomTitle>Heat Capacity Explained</CustomTitle>
            <CustomText>
              Heat capacity is a fundamental thermodynamic property that
              quantifies the amount of heat energy required to raise the
              temperature of a substance by a certain amount. The heat capacity
              C of a material can be calculated based on its mass m and the
              specific heat C
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                s
              </CustomText>{" "}
              of the material.
            </CustomText>
            <CustomText>
              The formula for calculating heat capacity is given by:
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${C = m C_s}$"}
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>C is the heat capacity</CustomText>

            <CustomText>m is the mass of the material</CustomText>
            <CustomText>
              C
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                s
              </CustomText>{" "}
              is the specific heat of the material
            </CustomText>

            <CustomText>
              The unit of heat capacity is typically expressed in joules per
              degree Celsius (J/°C) in the International System of Units (SI).
              This means that the heat capacity tells us how much heat energy is
              needed to raise the temperature of the substance by one degree
              Celsius.
            </CustomText>
            <CustomText>
              The specific heat C
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                s
              </CustomText>{" "}
              is a material-specific property representing the amount of heat
              required to raise the temperature of one unit mass of the
              substance by one degree Celsius. It is typically measured in
              joules per gram per degree Celsius (J/g°C) or in calories per gram
              per degree Celsius (cal/g°C). Different materials have different
              specific heat values, and these values are crucial in
              understanding the thermal behavior of substances.
            </CustomText>
            <CustomText>
              The heat capacity calculation is particularly useful in various
              practical applications, such as in designing heating or cooling
              systems, assessing thermal energy storage, and understanding the
              temperature changes in chemical reactions. It's important to note
              that heat capacity is an extensive property, meaning it depends on
              the amount of material present. Consequently, the larger the mass
              of the substance, the greater the heat capacity required to cause
              a certain temperature change.
            </CustomText>
            <CustomText>
              In summary, calculating heat capacity based on mass and specific
              heat provides a quantitative measure of how much thermal energy is
              needed to change the temperature of a given amount of material.
              This information is valuable in a wide range of scientific and
              engineering contexts where heat transfer and temperature changes
              are critical considerations.
            </CustomText>
            <CustomPressable
              icon="back"
              onPress={() => setModalVisible(!modalVisible)}
            >
              Go Back
            </CustomPressable>
          </ScrollView>
        </CustomView>
      </Modal>
    </CustomView>
  );
}
