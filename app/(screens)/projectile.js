import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView } from "react-native";
import CustomPressable from "../../components/customPressable";
import { speedUnits, distanceUnits } from "../../utils/units";
import { convertFromSpeed, convertFromDistance } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function Projectile() {
  const [vel, setVel] = useState("50");
  const [angle, setAngle] = useState("40");
  const [initHeight, setInitHeight] = useState("5");
  const [velUnit, setVelUnit] = useState("meters per second (m/s)");
  const [angleUnit, setAngleUnit] = useState("degrees");
  const [heightUnit, setHeightUnit] = useState("meters (m)");

  const g = 9.806;

  const [time, setTime] = useState("");
  const [range, setRange] = useState("");
  const [maxHeight, setMaxHeight] = useState("");

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const convertAngle = (angle, unit) => {
    if (unit === "degrees") {
      return (+angle * 3.14) / 180;
    }
    return angle;
  };

  useEffect(() => {
    const convertedHeight = convertFromDistance(initHeight, heightUnit);
    const convertedVel = convertFromSpeed(vel, velUnit);
    const convertedAngle = convertAngle(angle, angleUnit);
    const horizVel = convertedVel * Math.cos(convertedAngle);
    const vertVel = convertedVel * Math.sin(convertedAngle);

    const timePassed =
      (+vertVel + Math.sqrt(vertVel ** 2 + 2 * g * +convertedHeight)) / g;
    setTime(timePassed.toFixed(3));
    const horizRange =
      (+horizVel / g) *
      (+vertVel + Math.sqrt(vertVel ** 2 + 2 * g * +convertedHeight));
    setRange(horizRange.toFixed(3));
    const maxHeightReached = +convertedHeight + vertVel ** 2 / (2 * g);
    setMaxHeight(parseFloat(maxHeightReached).toFixed(3));
  }, [initHeight, heightUnit, vel, velUnit, angle, angleUnit]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Projectile Physics</CustomTitle>
        <CustomFavorite name="projectile" />
      </CustomView>

      <CustomText>
        Evaluate the trajectory of a projectile based on various initial
        conditions.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 20 }}>
        <CustomView dir="horiz">
          <CustomInput placeholder="Speed" onChangeText={setVel} value={vel} />
          <CustomPicker
            onValueChange={(value) => {
              setVelUnit(value);
              // setWeight(String(convertWeight(weight, value)));
            }}
            value={velUnit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Launch Angle"
            onChangeText={setAngle}
            value={angle}
          />
          <CustomPicker
            onValueChange={(value) => {
              setAngleUnit(value);
              // setWeight(String(convertWeight(weight, value)));
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

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Initial Height"
            onChangeText={setInitHeight}
            value={initHeight}
          />
          <CustomPicker
            onValueChange={(value) => {
              setHeightUnit(value);
              // setWeight(String(convertWeight(weight, value)));
            }}
            value={heightUnit}
            items={distanceUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {maxHeight ? (
        <CustomView>
          <CustomText>Maximum Height (m): {maxHeight}</CustomText>
          <CustomText>Horizontal Range (m): {range}</CustomText>
          <CustomText>Time Elapsed (s): {time}</CustomText>
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
            <CustomTitle>Projectile Physics Explained</CustomTitle>
            <CustomText>
              Projectile motion is a fascinating aspect of classical mechanics
              that describes the motion of an object thrown into the air,
              experiencing only the force of gravity and air resistance (if
              present). This type of motion is characterized by the object
              following a curved trajectory under the influence of a constant
              gravitational acceleration. The physics of projectile motion can
              be analyzed using principles from kinematics and vector analysis.
            </CustomText>
            <CustomText>
              The key components of projectile motion include the launch angle,
              initial velocity, time of flight, range, and maximum height. The
              motion can be broken down into horizontal and vertical components.
              The horizontal motion is uniform and follows the laws of constant
              velocity, while the vertical motion is influenced by gravity and
              follows the laws of constant acceleration. The independence of
              these two components allows for a comprehensive analysis of
              projectile motion.
            </CustomText>
            <CustomText>
              For the horizontal component of the motion, the following
              equations apply
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${v_{0x} = v_x}$"}
            </MathJaxSvg>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${x_{0} = x_0 + v_x t}$"}
            </MathJaxSvg>
            <CustomText>
              For the vertical component of the motion, the following equations
              apply
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${y} = y_0 + {1 \\over2}( {v_{0y} + v_y}) t$"}
            </MathJaxSvg>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${v_y = v_{0y} - gt}$"}
            </MathJaxSvg>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${y} = {y_0 + v_{0y}t - {{1 \\over 2} gt^2}}$"}
            </MathJaxSvg>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${v_y^2} = {v_{0y}^2 - 2g (y - y_0)}$"}
            </MathJaxSvg>
            <CustomText>
              In the above cases, x and y refer to the positions along the
              horizontal and vertical orientations, respectively. v represents
              the velocity, t represents the time elapsed and g represents the
              graviational acceleration. A subscript of 0 indicates an initial
              condition.
            </CustomText>
            <CustomText>
              The trajectory of a projectile is a parabola, and its shape is
              determined by the interplay of the horizontal and vertical
              motions. The launch angle significantly influences the range and
              height of the projectile. For a given initial velocity, the range
              is maximized at a launch angle of 45 degrees in the absence of air
              resistance.
            </CustomText>
            <CustomText>
              The understanding of projectile motion is crucial in various
              fields, including sports, physics, engineering, and astronomy. The
              precise analysis of a projectile's motion allows for accurate
              predictions and optimizations, such as determining the ideal
              launch angle for a projectile to achieve maximum range or studying
              the motion of celestial bodies influenced by gravitational forces.
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
