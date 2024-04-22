import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView } from "react-native";
import CustomPressable from "../../components/customPressable";
import { speedUnits, areaUnits } from "../../utils/units";
import { convertFromSpeed, convertArea } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function WindLoad() {
  const [windVel, setWindVel] = useState("50");
  const [windVelUnit, setWindVelUnit] = useState("miles per hour (mph)");
  const [surfArea, setSurfArea] = useState("10");
  const [surfAreaUnit, setSurfAreaUnit] = useState("square feet (ft2)");
  const [angle, setAngle] = useState("90");
  const [angleUnit, setAngleUnit] = useState("degrees");

  const [dynPressure, setDynPressure] = useState(null);
  const [windLoad, setWindLoad] = useState(null);
  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const angleUnits = ["degrees", "radians"];

  const convertAngle = (angle, unit) => {
    if (unit === "degrees") {
      return (+angle * 3.14) / 180;
    }
    return angle;
  };

  useEffect(() => {
    const convertedVelocity = convertFromSpeed(windVel, windVelUnit);
    const pressure = 0.5 * 1.225 * convertedVelocity ** 2;
    setDynPressure(pressure.toFixed(3));
    const convertedArea = convertArea(surfArea, surfAreaUnit);
    const convertedAngle = convertAngle(angle, angleUnit);
    const load = pressure * convertedArea * Math.sin(convertedAngle);
    setWindLoad(load.toFixed(3));
  }, [windVel, windVelUnit, surfArea, surfAreaUnit, angle, angleUnit]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Wind Load</CustomTitle>
        <CustomFavorite name="windLoad" />
      </CustomView>
      <CustomText>
        Calculate the wind load on a structure. This calcultor assumes standard
        temperature & pressure (STP) conditions.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 20 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Wind Velocity"
            onChangeText={setWindVel}
            value={windVel}
          />
          <CustomPicker
            onValueChange={(value) => {
              setWindVelUnit(value);
            }}
            value={windVelUnit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Surface Area"
            onChangeText={setSurfArea}
            value={surfArea}
          />
          <CustomPicker
            onValueChange={(value) => {
              setSurfAreaUnit(value);
            }}
            value={surfAreaUnit}
            items={areaUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Angle"
            onChangeText={setAngle}
            value={angle}
          />
          <CustomPicker
            onValueChange={(value) => {
              setAngleUnit(value);
            }}
            value={angleUnit}
            items={[
              { label: "degrees", value: "degrees" },
              { label: "radians", value: "radians" },
            ]}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {dynPressure > 0 ? (
        <CustomView>
          <CustomText>Dynamic Pressure: {dynPressure} Pa</CustomText>

          <CustomText>Wind Load: {windLoad} N</CustomText>
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
            <CustomTitle>Wind Load Explained</CustomTitle>
            <CustomText>
              Calculating windLoad load is a critical aspect of structural
              engineering, especially when designing buildings, bridges, or
              other structures exposed to windLoad forces. Wind load is the
              force exerted by the windLoad on a structure, and it is influenced
              by factors such as windLoad speed, angle of incidence, and the
              surface area of the object facing the windLoad. Understanding and
              accurately calculating windLoad loads are essential for ensuring
              the safety and stability of structures under various windLoad
              conditions.
            </CustomText>
            <CustomText>
              The basic formula for calculating windLoad load F is given by
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {
                "${F} = {{1\\over 2} \\times C_d \\times A \\times \\rho \\times V^2}$"
              }
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>F is the windLoad force</CustomText>

            <CustomText>
              C
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                d
              </CustomText>{" "}
              is the drag coefficient
            </CustomText>
            <CustomText>A is the reference area facing the windLoad</CustomText>
            <CustomText>&rho; is the air density</CustomText>
            <CustomText>V is the windLoad speed.</CustomText>

            <CustomText>
              The drag coefficient is a dimensionless factor that depends on the
              shape of the object and the angle of incidence of the windLoad. It
              represents how aerodynamic or streamlined an object is. For common
              shapes, such as flat plates or cylinders, empirical values for the
              coefficient can be found in engineering literature.
            </CustomText>
            <CustomText>
              The reference area A is the projected area of the object facing
              the windLoad. For example, in the case of a rectangular building,
              A would be the product of the width and height of the side facing
              the windLoad.
            </CustomText>
            <CustomText>
              The air density &rho; depends on environmental conditions such as
              temperature and altitude. It is typically assumed to be constant
              at sea level for standard atmospheric conditions.
            </CustomText>
            <CustomText>
              The windLoad speed V is a crucial factor, and its influence on
              windLoad load is quadratic. This means that even a small increase
              in windLoad speed can lead to a significant increase in windLoad
              load.
            </CustomText>
            <CustomText>
              To account for the angle of incidence (&theta;) of the windLoad,
              the formula can be modified as follows:
            </CustomText>
            <MathJaxSvg color={globalStyles.equation.color} fontSize="20">
              {
                "${F} = {{1\\over 2} \\times C_d \\times A \\times \\rho \\times V^2 \\times cos(\\theta)}$"
              }
            </MathJaxSvg>

            <CustomText>
              This modification considers that the effective area facing the
              windLoad is reduced when the windLoad is incident at an angle.
            </CustomText>
            <CustomText>
              Engineers use these formulas to assess and design structures that
              can withstand the windLoad loads they are likely to encounter in
              their specific geographical locations. Wind load calculations play
              a vital role in ensuring the structural integrity and safety of
              buildings and other structures, particularly in areas prone to
              strong winds or hurricanes.
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
