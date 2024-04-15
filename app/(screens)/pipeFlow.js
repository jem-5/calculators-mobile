import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView, View, Text } from "react-native";
import CustomPressable from "../../components/customPressable";
import { distanceUnits } from "../../utils/units";
import { convertFromDistance } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function PipeFlow() {
  const [diam, setDiam] = useState("50");
  const [diamUnit, setDiamUnit] = useState("meters (m)");

  const [material, setMaterial] = useState("Copper");

  const [length, setLength] = useState("10");
  const [lengthUnit, setLengthUnit] = useState("meters (m)");

  const [drop, setDrop] = useState("7");
  const [dropUnit, setDropUnit] = useState("meters (m)");

  const [velocity, setVelocity] = useState(null);
  const [volFlow, setVolFlow] = useState(null);

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pipeRoughness = useMemo(() => {
    return {
      "Cast iron": 130,
      "Asbestos cement": 140,
      "Corrugated metal": 60,
      Concrete: 120,
      PVC: 150,
      Polyethylene: 140,
      Copper: 135,
      Brass: 135,
      Fiberglass: 150,
      Lead: 135,
      "Steel, seamless": 100,
      "Steel, unlined": 145,
      Aluminum: 140,
      Tin: 130,
      Plastic: 140,
    };
  }, []);

  let materialOptions = [];
  Object.keys(pipeRoughness).forEach((item, i) => {
    materialOptions.push({
      label: item,
      value: item,
    });
  });

  useEffect(() => {
    const convertedDiam = parseFloat(convertFromDistance(diam, diamUnit));
    const convertedLength = parseFloat(convertFromDistance(length, lengthUnit));
    const convertedDrop = parseFloat(convertFromDistance(drop, dropUnit));

    const hydRad = convertedDiam / 4;
    const slope = convertedDrop / convertedLength;

    const vel =
      0.849 * pipeRoughness[material] * hydRad ** 0.63 * slope ** 0.54;
    const flow = (vel * 3.14 * convertedDiam ** 2) / 4;

    setVelocity(vel);
    setVolFlow(flow);
  }, [
    diam,
    diamUnit,
    length,
    lengthUnit,
    drop,
    dropUnit,
    pipeRoughness,
    material,
  ]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Pipe Flow</CustomTitle>
        <CustomFavorite name="pipeFlow" />
      </CustomView>

      <CustomText>
        Calculate the flow velocity and volumetric flow rate in a pipe based on
        various conditions.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Pipe Diameter"
            onChangeText={setDiam}
            value={diam}
          />
          <CustomPicker
            onValueChange={(value) => {
              setDiamUnit(value);
            }}
            value={diamUnit}
            items={distanceUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Pipe Length"
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
            placeholder="Pipe Drop"
            onChangeText={setDrop}
            value={drop}
          />
          <CustomPicker
            onValueChange={(value) => {
              setDropUnit(value);
            }}
            value={dropUnit}
            items={distanceUnits}
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
      </CustomView>

      {velocity ? (
        <CustomView>
          <CustomText>
            Roughness Coefficient: {pipeRoughness[material]}
          </CustomText>

          <CustomText>Velocity: {velocity.toFixed(3)} m/s</CustomText>

          <View style={{ flexDirection: "row" }}>
            <CustomText>
              Volumetric Flow Rate: {volFlow.toFixed(3)} m
            </CustomText>
            <Text style={{ fontSize: 15 }}>3</Text>
            <CustomText>/s</CustomText>
          </View>
        </CustomView>
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
            <CustomTitle>Pipe Flow Explained</CustomTitle>
            <CustomText>
              Calculating pipe flow velocity and volumetric flow rate is crucial
              in fluid mechanics and engineering, especially when designing
              piping systems or analyzing fluid transport. The flow velocity V
              and volumetric flow rate Q are interrelated parameters that
              provide insights into the dynamics of fluid movement within pipes.
            </CustomText>
            <CustomText>
              The volumetric flow rate represents the volume of fluid passing
              through a cross-section of a pipe per unit of time. It is
              calculated using the equation
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${Q = A \\times V}$"}
            </MathJaxSvg>

            <CustomText>
              where A is the cross-sectional area of the pipe and V is the flow
              velocity. The unit of volumetric flow rate is typically expressed
              as cubic meters per second (m³/s) in the metric system or cubic
              feet per second (ft³/s) in the imperial system.
            </CustomText>
            <CustomText>
              The flow velocity in a pipe can be determined using the volumetric
              flow rate and pipe dimensions. The relationship is expressed as
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${V} = {Q \\over A}$"}
            </MathJaxSvg>
            <CustomText>
              where Q is the volumetric flow rate and A is the cross-sectional
              area of the pipe. The flow velocity is a critical parameter in
              fluid dynamics, influencing factors such as pressure drop, energy
              consumption, and the efficiency of fluid transport.
            </CustomText>
            <CustomText>
              For a circular pipe, the cross-sectional area A is given by
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${A} = {\\pi r^2}$"}
            </MathJaxSvg>
            <CustomText>
              where r is the radius of the pipe. The volumetric flow rate Q is
              then calculated using the equation mentioned earlier. For pipes
              with non-circular cross-sections, the appropriate formula for the
              cross-sectional area must be used based on the specific geometry
              of the pipe.
            </CustomText>
            <CustomText>
              Understanding and calculating flow velocity and volumetric flow
              rate are essential for designing piping systems that meet specific
              requirements, ensuring that the fluid is transported efficiently
              and with minimal energy losses. Engineers use these calculations
              to optimize pipe dimensions, select appropriate pump sizes, and
              assess the overall performance of fluid transport systems in
              various engineering applications.
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
