import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import { speedUnits, timeUnits, distanceUnits } from "../../utils/units";
import {
  convertFromSpeed,
  convertFromDistance,
  convertFromTime,
} from "../../utils/conversions";
import CustomLine from "../../components/customLine";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function FreeFall() {
  const gravity = 9.80665;

  const [initVel, setInitVel] = useState(null);
  const [initVelUnit, setInitVelUnit] = useState("meters per second (m/s)");

  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("meters (m)");

  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("seconds (s)");

  const [vel, setVel] = useState("");
  const [velUnit, setVelUnit] = useState("meters per second (m/s)");

  const [answerVel, setAnswerVel] = useState(null);
  const [answerHeight, setAnswerHeight] = useState(null);
  const [answerTime, setAnswerTime] = useState(null);

  const [change, setChange] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [finalAnswer, setFinalAnswer] = useState(null);
  const [calcDone, setCalcDone] = useState(false);

  useEffect(() => {
    setFinalAnswer(null);

    if (change === "height") {
      setTime(null);
      setVel(null);
      const cInitVel = convertFromSpeed(initVel, initVelUnit);
      const convertedHeight = convertFromDistance(height, heightUnit);
      const timePassed =
        (-cInitVel + Math.sqrt(cInitVel ** 2 + 2 * gravity * convertedHeight)) /
        gravity;
      const velFinal = +initVel + gravity * timePassed;
      setCalcDone(true);
      setFinalAnswer([
        "Final Velocity (m/s)",
        velFinal,
        "Time Passed (s)",
        timePassed,
      ]);
    } else if (change === "time") {
      setHeight(null);
      setVel(null);
      const cInitVel = convertFromSpeed(initVel, initVelUnit);
      const cTime = convertFromTime(time, timeUnit);

      const velFinal = +cInitVel + gravity * cTime;
      setVel(velFinal);
      const distTraveled = +cInitVel * cTime + 0.5 * gravity * cTime ** 2;

      setCalcDone(true);
      setFinalAnswer([
        "Final Velocity(m/s)",
        velFinal,
        "Distance Traveled(m)",
        distTraveled,
      ]);
    } else if (change === "velocity") {
      setTime(null);
      setHeight(null);
      const cInitVel = convertFromSpeed(initVel, initVelUnit);
      const cVel = convertFromSpeed(vel, velUnit);

      const timePassed = (cVel - cInitVel) / gravity;
      const distTraveled =
        +cInitVel * timePassed + 0.5 * gravity * timePassed ** 2;

      setCalcDone(true);
      setFinalAnswer([
        "Distance Traveled(m)",
        distTraveled,
        "Time Passed(s)",
        timePassed,
      ]);
    }
  }, [
    height,
    time,
    vel,
    initVel,
    initVelUnit,
    heightUnit,
    timeUnit,
    velUnit,
    answerVel,
    answerHeight,
    answerTime,
  ]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Free Fall</CustomTitle>
        <CustomFavorite name="freeFall" />
      </CustomView>
      <CustomText>
        How does an object move under the force of gravitational acceleration?
        Enter any one of the three required variables (height, time of fall or
        final velocity) and the calculator will automatically calculate the
        remaining variables.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 5 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="square" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Object Falling</CustomText>
        </CustomView>

        <CustomText>Initial velocity is optional.</CustomText>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Initial Vel."
            onChangeText={setInitVel}
            value={initVel}
          />
          <CustomPicker
            onValueChange={(value) => {
              setInitVelUnit(value);
            }}
            value={initVelUnit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomLine />

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Height"
            onChangeText={(value) => {
              setHeight(value);
              setChange("height");
            }}
            value={height}
          />
          <CustomPicker
            onValueChange={(value) => {
              setHeightUnit(value);
            }}
            value={heightUnit}
            items={distanceUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Time of Fall"
            onChangeText={(value) => {
              setTime(value);
              setChange("time");
            }}
            value={time}
          />
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
          <CustomInput
            placeholder="Final Vel."
            onChangeText={(value) => {
              setVel(value);
              setChange("velocity");
            }}
            value={vel}
          />
          <CustomPicker
            onValueChange={(value) => {
              setVelUnit(value);
            }}
            value={velUnit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {finalAnswer ? (
        <CustomView>
          <CustomText>
            {finalAnswer[0]}: {finalAnswer[1].toFixed(3)}
          </CustomText>
          <CustomText>
            {finalAnswer[2]}: {finalAnswer[3].toFixed(3)}
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
            <CustomTitle>Free Fall Explained</CustomTitle>
            <CustomText>
              In the context of free fall, an object is falling under the
              influence of gravity with no other forces acting on it except for
              gravity. The motion of an object in free fall can be described
              using several kinematic equations that relate its position,
              velocity, time, and acceleration. Three key parameters often of
              interest are time, speed, and height, and they can be calculated
              using these equations.
            </CustomText>
            <CustomText>
              The equation that describes the vertical motion of an object in
              free fall is:
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${h(t)} = {h_0} + {v_0}{t} - {1 \\over 2} gt^2$"}
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>h(t) is the height of the object at time t</CustomText>

            <CustomText>
              h
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                0
              </CustomText>{" "}
              is the initial height of the object
            </CustomText>
            <CustomText>
              v
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                0
              </CustomText>{" "}
              is the initial velocity of the object
            </CustomText>

            <CustomText>
              g is the acceleration due to gravity (approximately 9.8 m/s^2){" "}
            </CustomText>
            <CustomText>t is the time elapsed</CustomText>

            <CustomText>
              To calculate the time of flight, one might use the quadratic
              formula to solve for t when h(t) = 0. Depending on the problem,
              there may be two solutions (corresponding to the ascent and
              descent) or just one solution (if the object is dropped).
            </CustomText>
            <CustomText>
              To determine the final velocity v
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                f
              </CustomText>{" "}
              at a certain time, the equation is:
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${v_f} = {v_0} - {gt}$"}
            </MathJaxSvg>

            <CustomText>
              The speed of the object will be the magnitude of the final
              velocity.
            </CustomText>
            <CustomText>
              The height at a specific time t can be found using the first
              equation by plugging in the given values for initial height,
              initial velocity, gravitational acceleration and time elapsed.
            </CustomText>
            <CustomText>
              These equations provide a comprehensive framework for analyzing
              the motion of an object in free fall. It is important to be
              consistent with units (e.g., meters for height, seconds for time)
              when applying these equations. Additionally, if the initial
              velocity is zero, certain terms in the equations simplify, making
              the calculations more straightforward. Free fall problems are
              commonly encountered in physics, and these equations offer a
              systematic way to analyze and solve them.
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
