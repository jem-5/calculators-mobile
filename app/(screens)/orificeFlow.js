import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Image, Modal, ScrollView, View, Text } from "react-native";
import CustomPressable from "../../components/customPressable";
import { distanceUnits } from "../../utils/units";
import { convertFromDistance } from "../../utils/conversions";

import OrificeDiagram from "../../assets/images/orifice.png";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function OrificeFlow() {
  const [diameter, setDiameter] = useState("5");
  const [diameterUnit, setDiameterUnit] = useState("meters (m)");
  const [head, setHead] = useState("10");
  const [headUnit, setHeadUnit] = useState("meters (m)");
  ("");
  const [coefficient, setCoefficient] = useState("0.8");

  const [discharge, setDischarge] = useState(0);

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const convertedDiameter = convertFromDistance(diameter, diameterUnit);
    const convertedHead = convertFromDistance(head, headUnit);
    const flow =
      coefficient *
      (convertedDiameter / 2) ** 2 *
      3.14 *
      Math.sqrt(2 * 9.81 * convertedHead);
    setDischarge(flow.toFixed(3));
  }, [diameter, diameterUnit, head, headUnit, coefficient]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Orifice Flow</CustomTitle>
        <CustomFavorite name="orificeFlow" />
      </CustomView>
      <CustomText>
        Determine the discharge flow rate of water based on system geometry.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 10 }}>
        <Image source={OrificeDiagram} />

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Orifice Diameter"
            onChangeText={setDiameter}
            value={diameter}
          />
          <CustomPicker
            onValueChange={(value) => {
              setDiameterUnit(value);
            }}
            value={diameterUnit}
            items={distanceUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Center Line Head"
            onChangeText={setHead}
            value={head}
          />
          <CustomPicker
            onValueChange={(value) => {
              setHeadUnit(value);
            }}
            value={headUnit}
            items={distanceUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Discharge Coefficient"
            onChangeText={setCoefficient}
            value={coefficient}
          />
        </CustomView>
      </CustomView>

      {discharge ? (
        <View style={{ flexDirection: "row" }}>
          <CustomText>Discharge Flow Rate: {discharge} m</CustomText>
          <Text style={{ fontSize: 15 }}>3</Text>
          <CustomText>/s</CustomText>
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
            <CustomTitle>Orifice Flow Explained</CustomTitle>
            <CustomText>
              Calculating orifice flow discharge is a fundamental aspect of
              fluid mechanics and is commonly employed in various engineering
              applications, such as in the design of hydraulic systems, flow
              measurement devices, and water distribution systems. The orifice
              equation is used to estimate the flow rate through an orifice
              based on the head of water, the diameter of the orifice, and the
              discharge coefficient.
            </CustomText>
            <CustomText>
              The basic form of the orifice equation is given by:
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${Q} = {C_d} {A} {\\sqrt{2gh} }$"}
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>Q is the discharge flow rate</CustomText>

            <CustomText>
              C
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                d
              </CustomText>{" "}
              is the discharge coefficient
            </CustomText>
            <CustomText>
              A is the cross-sectional area of the orifice
            </CustomText>
            <CustomText>g is the acceleration of gravity</CustomText>
            <CustomText>
              h is the head of water above the center of the orifice
            </CustomText>

            <CustomText>
              The discharge coefficient C
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                d
              </CustomText>{" "}
              is a dimensionless factor that accounts for the efficiency of the
              orifice in converting potential energy to kinetic energy. It is
              influenced by the shape and smoothness of the orifice, the
              approach velocity of the fluid, and other factors affecting flow
              patterns.
            </CustomText>
            <CustomText>
              The cross-sectional area of the orifice A is calculated based on
              the orifice diameter d as
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${A} = {\\pi d^2 \\over 4}$"}
            </MathJaxSvg>
            <CustomText>
              This equation is derived from Bernoulli's equation and
              Torricelli's law, assuming ideal conditions and neglecting losses
              due to friction and other factors. The square root relationship
              with the head of water demonstrates the dependence of flow rate on
              the square root of the potential energy available.
            </CustomText>
            <CustomText>
              It's important to note that the discharge coefficient is often
              experimentally determined for a specific orifice under particular
              flow conditions. The actual value of the discharge coefficient can
              vary based on factors such as the type of orifice, the Reynolds
              number of the flow, and the orifice's geometry.
            </CustomText>
            <CustomText>
              Engineers use the orifice equation to design and analyze systems
              where accurate flow rate measurements are crucial. Orifices are
              commonly used in flow meters, control valves, and other hydraulic
              devices, and understanding the relationship between head, orifice
              diameter, and discharge coefficient is essential for optimizing
              system performance.
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
