import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import { speedUnits } from "../../utils/units";
import { convertFromSpeed } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function StoppingDistance() {
  const [speed, setSpeed] = useState("50");
  const [speedUnit, setSpeedUnit] = useState("kilometers per hour (km/h)");
  const [reactionTime, setReactionTime] = useState("1.5");
  const [reactionUnit, setReactionUnit] = useState("1.5");
  const [grade, setGrade] = useState("5");
  const [gradeDir, setGradeDir] = useState("1");
  const [condition, setCondition] = useState(0.7);
  const [customTime, setCustomTime] = useState(true);
  const [stopDistance, setStopDistance] = useState(null);
  const [canEditReaction, setCanEditReaction] = useState(false);

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const convertedSpeed = 3.6 * convertFromSpeed(speed, speedUnit);
    console.log(convertedSpeed);
    const dist =
      0.278 * +reactionTime * +convertedSpeed +
      convertedSpeed ** 2 / (254 * ((+grade / 100) * +gradeDir + +condition));
    setStopDistance(dist.toFixed(3));
  }, [grade, speed, condition, gradeDir, reactionTime, speedUnit]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Stopping Distance</CustomTitle>
        <CustomFavorite name="stoppingDistance" />
      </CustomView>
      <CustomText>
        See how stopping distance varies under different conditions. This
        calculator uses the stopping distance formula provided by AASHTO (the
        American Association of State Highway and Transportation Officials).
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Speed"
            onChangeText={setSpeed}
            value={speed}
          />
          <CustomPicker
            onValueChange={(value) => {
              setSpeedUnit(value);
              // setWeight(String(convertWeight(weight, value)));
            }}
            value={speedUnit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Grade (%)"
            onChangeText={setGrade}
            value={grade}
          />
          <CustomPicker
            onValueChange={(value) => {
              setGradeDir(value);
              // setWeight(String(convertWeight(weight, value)));
            }}
            value={gradeDir}
            items={[
              {
                label: "uphill",
                value: 1,
              },
              {
                label: "downhill",
                value: -1,
              },
            ]}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Reaction Time (s)"
            onChangeText={setReactionTime}
            value={reactionTime}
            editable={canEditReaction}
          />
          <CustomPicker
            onValueChange={(value) => {
              setReactionTime(String(value));
              setCanEditReaction(false);
              setReactionUnit(value);
              if (value === 1) {
                setCanEditReaction(true);
              }
            }}
            value={reactionUnit}
            items={[
              {
                label: "alert driver (0.8s)",
                value: 0.8,
              },
              {
                label: "average driver (1.5s)",
                value: 1.5,
              },
              {
                label: "elderly driver (2s)",
                value: 2,
              },
              {
                label: "intoxicated driver (2.5s)",
                value: 2.5,
              },
              {
                label: "custom time",
                value: 1,
              },
            ]}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz" style={{ justifyContent: "center" }}>
          <CustomPicker
            onValueChange={(value) => {
              setCondition(value);
            }}
            value={condition}
            items={[
              {
                label: "dry road",
                value: 0.7,
              },
              {
                label: "wet road",
                value: 0.3,
              },
            ]}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {stopDistance ? (
        <CustomText>Stopping Distance: {stopDistance} m</CustomText>
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
            <CustomTitle>Stopping Distance Explained</CustomTitle>
            <CustomText>
              The stopping distance of a vehicle is a crucial factor in road
              safety and is influenced by various parameters, including speed,
              road conditions (wet or dry), driver reaction time, and road grade
              or slope. Understanding how these factors interact is essential
              for designing roadways, establishing speed limits, and promoting
              safe driving practices.
            </CustomText>
            <CustomText>
              The stopping distance of a vehicle consists of two main
              components: the thinking distance (also known as the reaction
              time) and the braking distance. The thinking distance is the
              distance traveled by the vehicle during the driver's reaction time
              before initiating the braking action. This time is influenced by
              the driver's attentiveness, alertness, and ability to react
              promptly to a situation. The braking distance is the distance the
              vehicle travels while coming to a complete stop after the brakes
              are applied.
            </CustomText>
            <CustomText>
              According to the the American Association of State Highway and
              Transportation Officials, the stopping distance can be calculated
              with the following equation
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {
                "${S} = 0.278 \\cdot t \\cdot v  + {v^2 \\over {254  (f + G)} }$"
              }
            </MathJaxSvg>
            <CustomText>where</CustomText>
            <CustomText>S is stopping distance in meters</CustomText>

            <CustomText>
              t is the perception reaction time in seconds
            </CustomText>
            <CustomText>v is the speed of the car in km/hr</CustomText>
            <CustomText>G is the grade (slope) of the road</CustomText>

            <CustomText>
              f is the coefficient of friction between the tires and the road
              (it is assumed to be 0.7 on a dry road and 0.3-0.4 on a wet road)
            </CustomText>

            <CustomText>
              It's important to note that the coefficient of friction varies
              between dry and wet road conditions, significantly affecting the
              braking distance. In wet conditions, the presence of water on the
              road reduces the friction between the tires and the road,
              resulting in a longer braking distance.
            </CustomText>
            <CustomText>
              In summary, the calculation of stopping distance involves
              considering both the reaction time and the braking distance. The
              interplay of factors such as speed, driver reaction time, road
              conditions, and road grade highlights the importance of these
              variables in road safety and underscores the need for responsible
              driving practices and well-maintained roadways.
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
