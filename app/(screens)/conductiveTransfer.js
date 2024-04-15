import React, { useCallback, useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView } from "react-native";
import CustomPressable from "../../components/customPressable";
import {
  timeUnits,
  distanceUnits,
  tempUnits,
  areaUnits,
} from "../../utils/units";
import {
  convertFromDistance,
  convertFromTime,
  convertArea,
  convertTemp,
} from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function ConductiveHeatTransfer() {
  const [area, setArea] = useState("20");
  const [areaUnit, setAreaUnit] = useState("square meters (m2)");

  const [coldTemp, setColdTemp] = useState("20");
  const [coldTempUnit, setColdTempUnit] = useState("Celsius (C)");

  const [hotTemp, setHotTemp] = useState("80");
  const [hotTempUnit, setHotTempUnit] = useState("Celsius (C)");

  const [time, setTime] = useState("5");
  const [timeUnit, setTimeUnit] = useState("seconds (s)");

  const [thickness, setThickness] = useState("0.05");
  const [thicknessUnit, setThicknessUnit] = useState("meters (m)");

  const [material, setMaterial] = useState("Concrete");

  const [heatTransfer, setHeatTransfer] = useState();

  const [modalVisible, setModalVisible] = useState(false);

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

  const thermalConductivityItems = [];
  Object.keys(thermalConductivity).forEach((item) => {
    thermalConductivityItems.push({
      label: item,
      value: item,
    });
  });

  useEffect(() => {
    const cTime = convertFromTime(time, timeUnit);
    const cArea = convertArea(area, areaUnit);
    const cHotT = convertTemp(hotTemp, hotTempUnit);
    console.log(cHotT);
    const cColdT = convertTemp(coldTemp, coldTempUnit);
    const cThickness = convertFromDistance(thickness, thicknessUnit);
    const heatTrans =
      (thermalConductivity[material] * cArea * cTime * (cHotT - cColdT)) /
      cThickness;
    setHeatTransfer(heatTrans.toFixed(3));
  }, [
    time,
    timeUnit,
    area,
    areaUnit,
    hotTemp,
    hotTempUnit,
    coldTemp,
    coldTempUnit,
    thickness,
    thicknessUnit,
    thermalConductivity,
    material,
  ]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Conductive Transfer</CustomTitle>
        <CustomFavorite name="conductiveTransfer" />
      </CustomView>

      <CustomText>
        Determine how much heat is transferred by conduction.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
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

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Cold Temperature"
            onChangeText={setColdTemp}
            value={coldTemp}
          />
          <CustomPicker
            onValueChange={(value) => {
              setColdTempUnit(value);
            }}
            value={coldTempUnit}
            items={tempUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Hot Temperature"
            onChangeText={setHotTemp}
            value={hotTemp}
          />
          <CustomPicker
            onValueChange={(value) => {
              setHotTempUnit(value);
            }}
            value={hotTempUnit}
            items={tempUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput placeholder="Time" onChangeText={setTime} value={time} />
          <CustomPicker
            onValueChange={(value) => {
              setTimeUnit(value);
            }}
            value={timeUnit}
            items={timeUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomPicker
            onValueChange={(value) => {
              setMaterial(value);
            }}
            value={material}
            items={thermalConductivityItems}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {heatTransfer ? (
        <CustomText>Heat Transfer: {heatTransfer} J</CustomText>
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
            <CustomTitle>Conductive Transfer Explained</CustomTitle>
            <CustomText>
              Conductive heat transfer is a fundamental mode of heat transfer
              that occurs when thermal energy flows through a solid material due
              to the direct interaction of neighboring atoms and molecules. In
              solids, heat is transferred through the vibration and collision of
              atoms within the lattice structure. The efficiency of this process
              depends on the material's thermal conductivity, which is a
              property defining its ability to conduct heat.
            </CustomText>
            <CustomText>
              The mechanism of conductive heat transfer involves the exchange of
              kinetic energy between adjacent particles. At the microscopic
              level, high-energy particles transfer some of their energy to
              lower-energy particles through collisions, leading to the
              propagation of heat. This process is characterized by Fourier's
              Law of Heat Conduction, which states that the rate of heat
              transfer is directly proportional to the temperature gradient
              across the material and inversely proportional to its thermal
              resistance.
            </CustomText>
            <CustomText>Newton's Law of Cooling is expressed as:</CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${q} = {-k} {\\Delta T \\over \\Delta x}$"}
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>
              q is the flow of heat via conduction through a slab
            </CustomText>

            <CustomText>
              k is the thermal conductivity of the material and it depends
              primarily on the physical composition of the material
            </CustomText>
            <CustomText>
              &Delta; T is the temperature difference maintained across the slab
            </CustomText>
            <CustomText>&Delta; x is the thickness of the slab</CustomText>

            <CustomText>
              Materials with high thermal conductivity, such as metals, are
              excellent conductors of heat because they allow for efficient
              transmission of thermal energy. In contrast, insulating materials,
              like rubber or certain polymers, have low thermal conductivity and
              impede the flow of heat. Engineers and scientists often consider
              the thermal properties of materials when designing systems to
              control heat transfer, such as in building insulation, electronic
              devices, or industrial processes.
            </CustomText>
            <CustomText>
              Understanding conductive heat transfer is crucial in various
              fields, as it plays a significant role in determining the thermal
              performance of materials and the overall efficiency of heat
              exchange processes. Engineers and researchers continually explore
              ways to optimize and manipulate conductive heat transfer for
              applications ranging from energy-efficient building design to the
              development of advanced electronic devices.
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
