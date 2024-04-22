import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import { distanceUnits, flowRateUnits } from "../../utils/units";
import { convertFromDistance, convertFlowRate } from "../../utils/conversions";

import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function FrictionLoss() {
  const [diam, setDiam] = useState("2");
  const [diamUnit, setDiamUnit] = useState("meters (m)");

  const [length, setLength] = useState("20");
  const [lengthUnit, setLengthUnit] = useState("meters (m)");

  const [flowRate, setFlowRate] = useState("2");
  const [flowUnit, setFlowUnit] = useState("cubic meters per second (m^3/s)");

  const [material, setMaterial] = useState("Copper");
  const [frictionLoss, setFrictionLoss] = useState("");

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
      Nickel: 0.00005,
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
    const convertedLength = convertFromDistance(length, lengthUnit);
    const convertedDiam = convertFromDistance(diam, diamUnit);
    const convertedFlowRate = convertFlowRate(flowRate, flowUnit);
    const headLoss =
      (10.67 * convertedLength * convertedFlowRate ** 1.852) /
      (pipeRoughness[material] ** 1.852 * convertedDiam ** 4.87);
    setFrictionLoss(headLoss.toFixed(3));
  }, [
    length,
    lengthUnit,
    diam,
    diamUnit,
    flowRate,
    flowUnit,
    pipeRoughness,
    material,
  ]);

  const inlineText = "inline text";
  const [loaded, setLoaded] = useState(false);
  const [expression, setExpression] = useState(
    `\\text{${inlineText} }c=\\pm\\sqrt{a^2 + b^2}`
  );

  setTimeout(
    () =>
      setExpression(
        `\\text{${inlineText} }d=\\pm\\sqrt{a^2 + b^2}\\text{ still}`
      ),
    2000
  );

  const inlineStyle = `
html, body {
  display: flex;
  background-color: #fafafa;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin: 0;
  display: flex;
}
`;

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Friction Loss</CustomTitle>
        <CustomFavorite name="frictionLoss" />
      </CustomView>
      <CustomText>
        Calculate how friction head loss along a pipe varies under different
        conditions.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 20 }}>
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
            placeholder="Volumetric Flowrate"
            onChangeText={setFlowRate}
            value={flowRate}
          />
          <CustomPicker
            onValueChange={(value) => {
              setFlowUnit(value);
            }}
            value={flowUnit}
            items={flowRateUnits}
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

      {material ? (
        <CustomText>
          Pipe Roughness Factor for {material}:{" "}
          {material ? pipeRoughness[material] : null}
        </CustomText>
      ) : null}

      {frictionLoss ? (
        <CustomView>
          <CustomText>
            Friction Head Loss (m of water):{" "}
            {frictionLoss ? frictionLoss : null}
          </CustomText>

          <CustomText>
            Friction Head Loss (ft of water):{" "}
            {frictionLoss ? (frictionLoss * 3.281).toFixed(3) : null}
          </CustomText>

          <CustomText>
            Friction Head Loss (kPa):{" "}
            {frictionLoss ? (frictionLoss * 9.80665).toFixed(3) : null}
          </CustomText>

          <CustomText>
            Friction Head Loss (psi):{" "}
            {frictionLoss ? (frictionLoss * 1.42233).toFixed(3) : null}
          </CustomText>
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
            <CustomTitle>Friction Loss Explained</CustomTitle>

            <CustomText>
              Calculating friction loss in a pipe is a critical aspect of fluid
              mechanics, particularly in applications such as plumbing, HVAC
              (heating, ventilation, and air conditioning) systems, and the
              design of pipelines. Friction loss refers to the loss of pressure
              in a fluid as it flows through a pipe due to the resistance
              encountered against the pipe walls. Several factors influence
              friction loss, including pipe roughness, diameter, length, and
              volumetric flow rate.
            </CustomText>
            <CustomText>
              The Darcy-Weisbach equation is commonly used to calculate friction
              loss in a pipe:
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {
                "${ \\Delta P \\over L} = {{f} \\cdot  {\\rho \\over 2} \\cdot {v^2 \\over D}}$"
              }
            </MathJaxSvg>

            <CustomText>where</CustomText>

            <CustomText>
              &Delta; P is the pressure drop (friction loss){" "}
            </CustomText>
            <CustomText>
              f is the Darcy friction factor (dependent on pipe roughness and
              Reynolds number){" "}
            </CustomText>
            <CustomText>L is the pipe length </CustomText>
            <CustomText>D is the pipe diameter</CustomText>
            <CustomText>&rho; is the fluid density</CustomText>
            <CustomText>v is the fluid velocity </CustomText>

            <CustomText>
              The Darcy friction factor f is a critical parameter and depends on
              the pipe roughness and the Reynolds number Re, which is a
              dimensionless quantity representing the ratio of inertial forces
              to viscous forces in the fluid. The Colebrook equation or Moody
              chart is often used to determine f based on the Reynolds number
              and pipe roughness.
            </CustomText>

            <CustomText>
              The relationship between friction loss and pipe diameter is
              inversely proportional, meaning larger diameter pipes generally
              experience lower friction losses for the same flow rate. Longer
              pipes, on the other hand, result in increased friction losses due
              to the extended surface area over which the fluid interacts with
              the pipe walls.
            </CustomText>
            <CustomText>
              The volumetric flow rate Q also plays a role, as higher flow rates
              increase the velocity of the fluid, leading to higher kinetic
              energy and subsequently more significant friction losses.
            </CustomText>
            <CustomText>
              Engineers use these calculations to design and optimize piping
              systems, ensuring that the desired flow rates are maintained while
              minimizing energy losses due to friction. Proper selection of pipe
              diameter, consideration of pipe roughness, and optimization of
              pipe length contribute to the efficient and effective operation of
              fluid transport systems.
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
