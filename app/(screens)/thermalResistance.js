import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView } from "react-native";
import CustomPressable from "../../components/customPressable";
import { distanceUnits, areaUnits } from "../../utils/units";
import { convertFromDistance, convertArea } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function ThermalResistance() {
  const [shape, setShape] = useState("Hollow Cylinder");
  const [material, setMaterial] = useState("Copper");
  const [length, setLength] = useState("10");
  const [lengthUnit, setLengthUnit] = useState("inches (in)");
  const [innerRad, setInnerRad] = useState("3");
  const [innerRadUnit, setInnerRadUnit] = useState("inches (in)");
  const [outerRad, setOuterRad] = useState("10");
  const [outerRadUnit, setOuterRadUnit] = useState("inches (in)");

  const [thickness, setThickness] = useState("5");
  const [thicknessUnit, setThicknessUnit] = useState("inches (in)");
  const [area, setArea] = useState("15");
  const [areaUnit, setAreaUnit] = useState("square inches (in2)");
  ("");
  const [resistance, setResistance] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const shapeChoiceOptions = ["Hollow Cylinder", "Plate", "Hollow Sphere"];

  const shapeChoices = [];
  shapeChoiceOptions.forEach((item) => {
    shapeChoices.push({
      label: item,
      value: item,
    });
  });

  const thermalConductivity = useMemo(() => {
    return {
      Air: 0.024,
      Water: 0.6,
      Aluminum: 205,
      Copper: 401,
      Iron: 80.2,
      Lead: 35.3,
      Glass: 1.0,
      Wood: 0.13,
      Brick: 0.6,
      Concrete: 1.7,
      "Insulation (Fiberglass)": 0.04,
      "Insulation (Foam)": 0.03,
      "Stainless Steel": 16.3,
      Silver: 429,
      Gold: 314,
      "Plastic (Polyethylene)": 0.36,
      "Plastic (Polypropylene)": 0.15,
      "Plastic (PVC)": 0.19,
      "Plastic (Polystyrene)": 0.03,
      "Plastic (Polyurethane)": 0.02,
    };
  }, []);

  const materialOptions = [];
  Object.keys(thermalConductivity).forEach((item) => {
    materialOptions.push({
      label: item,
      value: item,
    });
  });

  useEffect(() => {
    if (shape === "Plate") {
      const cThickness = convertFromDistance(thickness, thicknessUnit);
      const cArea = convertArea(+area, areaUnit);
      console.log(cArea);
      console.log(thermalConductivity[material]);
      const resis = cThickness / (thermalConductivity[material] * cArea);
      console.log(resis);
      setResistance(resis.toFixed(3));
    } else if (shape === "Hollow Cylinder") {
      const cLength = convertFromDistance(length, lengthUnit);
      const cInner = convertFromDistance(innerRad, innerRadUnit);
      const cOuter = convertFromDistance(outerRad, outerRadUnit);
      const resis =
        Math.log(cOuter / cInner) /
        (2 * 3.14 * cLength * thermalConductivity[material]);
      setResistance(resis.toFixed(3));
    } else if (shape === "Hollow Sphere") {
      const cInner = convertFromDistance(innerRad, innerRadUnit);
      const cOuter = convertFromDistance(outerRad, outerRadUnit);
      const resis =
        (+cOuter - +cInner) /
        (4 * 3.14 * cInner * cOuter * thermalConductivity[material]);
      setResistance(resis.toFixed(3));
    }
  }, [
    area,
    areaUnit,
    innerRad,
    innerRadUnit,
    outerRad,
    outerRadUnit,
    thickness,
    thicknessUnit,
    length,
    lengthUnit,
    thermalConductivity,
    material,
    shape,
  ]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Thermal Resistance</CustomTitle>
        <CustomFavorite name="thermalResistance" />
      </CustomView>
      <CustomText>
        Determine the thermal resistance for various materials of different
        geometries.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 20 }}>
        <CustomView dir="horiz" style={{ justifyContent: "center" }}>
          <CustomPicker
            onValueChange={(value) => {
              setShape(value);
            }}
            value={shape}
            items={shapeChoices}
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
            items={materialOptions}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
        {shape === "Hollow Cylinder" ? (
          <>
            <CustomView dir="horiz">
              <CustomInput
                placeholder="Length"
                onChangeText={setLength}
                value={length}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setLengthUnit(value);
                }}
                value={lengthUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>

            <CustomView dir="horiz">
              <CustomInput
                placeholder="Inner Radius"
                onChangeText={setInnerRad}
                value={innerRad}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setInnerRadUnit(value);
                }}
                value={innerRadUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>

            <CustomView dir="horiz">
              <CustomInput
                placeholder="Outer Radius"
                onChangeText={setOuterRad}
                value={outerRad}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setOuterRadUnit(value);
                }}
                value={outerRadUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>
          </>
        ) : shape === "Hollow Sphere" ? (
          <>
            <CustomView dir="horiz">
              <CustomInput
                placeholder="Inner Radius"
                onChangeText={setInnerRad}
                value={innerRad}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setInnerRadUnit(value);
                }}
                value={innerRadUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>

            <CustomView dir="horiz">
              <CustomInput
                placeholder="Outer Radius"
                onChangeText={setOuterRad}
                value={outerRad}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setOuterRadUnit(value);
                }}
                value={outerRadUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>
          </>
        ) : shape === "Plate" ? (
          <>
            <CustomView dir="horiz">
              <CustomInput
                placeholder="Cross Sectional Area"
                onChangeText={setArea}
                value={area}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setAreaUnit(value);
                }}
                value={areaUnit}
                items={areaUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>

            <CustomView dir="horiz">
              <CustomInput
                placeholder="Thickness"
                onChangeText={setThickness}
                value={thickness}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setThicknessUnit(value);
                }}
                value={thicknessUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>
          </>
        ) : null}
      </CustomView>

      {resistance ? (
        <>
          <CustomText>
            Thermal Conductivity: {thermalConductivity[material]} W/(m × °C)
          </CustomText>
          <CustomText>Thermal Resistance: {resistance} °C/W</CustomText>
        </>
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
            <CustomTitle>Thermal Resistance Explained</CustomTitle>
            <CustomText>
              Thermal resistance and thermal conductivity are crucial concepts
              in understanding heat transfer processes in materials. Thermal
              resistance R is a measure of how much a material impedes the flow
              of heat. It is analogous to electrical resistance in that it
              represents the opposition to the flow of thermal energy. Thermal
              resistance is influenced by factors such as material thickness,
              cross-sectional area, and the thermal conductivity of the
              material.
            </CustomText>
            <CustomText>
              Thermal conductivity k is a material property that quantifies its
              ability to conduct heat. It represents the rate at which heat can
              pass through a unit area of a material under a temperature
              gradient. Materials with high thermal conductivity allow heat to
              transfer quickly, while those with low thermal conductivity impede
              heat transfer. Metals, for example, typically have high thermal
              conductivity due to the free movement of electrons, which can
              efficiently carry thermal energy. In contrast, insulating
              materials like foam or fiberglass have low thermal conductivity
              because they trap air pockets, reducing the transfer of heat.
            </CustomText>
            <CustomText>
              The relationship between thermal resistance and thermal
              conductivity is inverse; that is, materials with high thermal
              conductivity have low thermal resistance and vice versa. This
              relationship can be expressed mathematically as:
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${R} = {t \\over {k \\cdot A}}$"}
            </MathJaxSvg>
            <CustomText>where</CustomText>
            <CustomText>R is the thermal resistance</CustomText>

            <CustomText>t is the thickness of the material</CustomText>
            <CustomText>
              k is the thermal conductivity of the material
            </CustomText>
            <CustomText>
              A is the cross-sectional area through which heat flows
            </CustomText>

            <CustomText>
              Understanding thermal resistance and thermal conductivity is
              essential in various engineering applications, such as building
              insulation, electronic device design, and thermal management
              systems. Engineers use these concepts to optimize the efficiency
              of heat transfer processes, minimize energy loss, and ensure the
              proper functioning of systems operating under different
              temperature conditions. Additionally, advancements in materials
              science continue to expand our ability to manipulate thermal
              properties, leading to innovations in heat dissipation, energy
              conservation, and thermal insulation technologies.
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
