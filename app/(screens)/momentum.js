import nerdamer from "nerdamer/nerdamer.core.js";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import "nerdamer/Solve.js";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import massUnits, { speedUnits } from "../../utils/units";
import {
  convertFromSpeed,
  convertFromMass,
  convertToSpeed,
  convertToMass,
} from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function Momentum() {
  const [mass1, setMass1] = useState("");
  const [mass2, setMass2] = useState("");
  const [mass1Unit, setMass1Unit] = useState("kilograms (kg)");
  const [mass2Unit, setMass2Unit] = useState("kilograms (kg)");

  const [initVelo1, setInitVelo1] = useState("");
  const [initVelo2, setInitVelo2] = useState("");
  const [initVelo1Unit, setInitVelo1Unit] = useState("meters per second (m/s)");
  const [initVelo2Unit, setInitVelo2Unit] = useState("meters per second (m/s)");

  const [finVelo1, setFinVelo1] = useState("");
  const [finVelo2, setFinVelo2] = useState("");
  const [finVelo1Unit, setFinVelo1Unit] = useState("meters per second (m/s)");
  const [finVelo2Unit, setFinVelo2Unit] = useState("meters per second (m/s)");

  const [finalAnswer, setFinalAnswer] = useState(null);
  const [finalAnswerDesc, setFinalAnswerDesc] = useState(null);

  const [massUnit, setMassUnit] = useState("kilograms (kg)");
  const [velUnit, setVelUnit] = useState("meters per second (m/s)");

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const allVariables = useMemo(() => {
    return {
      mass1,
      initVelo1,
      finVelo1,
      mass2,
      initVelo2,
      finVelo2,
    };
  }, [mass1, initVelo1, finVelo1, mass2, initVelo2, finVelo2]);

  const findMissingVar = useCallback(() => {
    const index = Object.values(allVariables).findIndex((item) => item === "");
    const key = Object.keys(allVariables)[index];
    setFinalAnswerDesc(getVariableDescription[key]);
    return key;
  }, [allVariables]);

  useEffect(() => {
    setCalcDone(false);
    const variables = [mass1, mass2, initVelo1, initVelo2, finVelo1, finVelo2];
    const numberEmptyVars = variables.filter((item) => item === "");

    if (numberEmptyVars.length === 1) {
      const key = findMissingVar();
      const convertedKey = (str) => {
        return `c${str[0].toUpperCase()}${str.slice(1)}`;
      };
      const missingValue = nerdamer.solveEquations(
        "cMass1 * cInitVelo1 + cMass2 * cInitVelo2 = cMass1 * cFinVelo1 + cMass2 * cFinVelo2",
        convertedKey(key)
      );
      let cMass1 = String(convertFromMass(mass1, mass1Unit));
      let cMass2 = String(convertFromMass(mass2, mass2Unit));
      let cInitVelo1 = String(convertFromSpeed(initVelo1, initVelo1Unit));
      let cInitVelo2 = String(convertFromSpeed(initVelo2, initVelo2Unit));
      let cFinVelo1 = String(convertFromSpeed(finVelo1, finVelo1Unit));
      let cFinVelo2 = String(convertFromSpeed(finVelo2, finVelo2Unit));
      const myVariables = {
        cMass1: cMass1,
        cInitVelo1: cInitVelo1,
        cFinVelo1: cFinVelo1,
        cMass2: cMass2,
        cInitVelo2: cInitVelo2,
        cFinVelo2: cFinVelo2,
      };

      const expression1 = nerdamer(missingValue.toString(), myVariables);
      const num = parseFloat(expression1.text()).toFixed(3);
      setFinalAnswer(Math.abs(num));
      setCalcDone(true);
    }
  }, [
    mass1,
    mass2,
    initVelo1,
    initVelo2,
    finVelo1,
    finVelo2,
    mass1Unit,
    mass2Unit,
    initVelo1Unit,
    initVelo2Unit,
    finVelo1Unit,
    finVelo2Unit,
  ]);

  const getVariableDescription = {
    mass1: "Mass of Object 1",
    mass2: "Mass of Object 2",
    initVelo1: "Initial Velocity of Object 1",
    initVelo2: "Initial Velocity of Object 2",
    finVelo1: "Final Velocity of Object 1",
    finVelo2: "Final Velocity of Object 2",
  };

  const displayFinalAnswer = () => {
    if (finalAnswerDesc && finalAnswerDesc.includes("Velocity")) {
      return (
        <CustomView>
          <CustomText>{finalAnswer} m/s</CustomText>
          <CustomText>
            {convertToSpeed(finalAnswer, "feet per second (ft/s)").toFixed(3)}{" "}
            ft/s
          </CustomText>
          <CustomText>
            {convertToSpeed(finalAnswer, "kilometers per hour (km/h)").toFixed(
              3
            )}{" "}
            km/h
          </CustomText>
        </CustomView>
      );
    } else if (finalAnswerDesc && finalAnswerDesc.includes("Mass")) {
      console.log("mass");
      return (
        <CustomView>
          <CustomText>{finalAnswer} kg</CustomText>
          <CustomText>
            {convertToMass(finalAnswer, "milligrams (mg)").toFixed(3)} mg
          </CustomText>
          <CustomText>
            {convertToMass(finalAnswer, "grams (g)").toFixed(3)} g
          </CustomText>
          <CustomText>
            {convertToMass(finalAnswer, "kilograms (kg)").toFixed(3)} kg
          </CustomText>
          <CustomText>
            {convertToMass(finalAnswer, "ounces (oz)").toFixed(3)} oz
          </CustomText>
          <CustomText>
            {convertToMass(finalAnswer, "pounds (lb)").toFixed(3)} lb
          </CustomText>
        </CustomView>
      );
    }
  };

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Conservation of Momentum</CustomTitle>
        <CustomFavorite name="momentum" />
      </CustomView>
      <CustomText>
        How does the conservation of linear momentum help us solve physics
        problems? There are 6 variables. Once you enter any 5 values, the
        calculator will determine the final value.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 10 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="square" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Object 1</CustomText>
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Mass"
            onChangeText={setMass1}
            value={mass1}
          />
          <CustomPicker
            onValueChange={(value) => {
              setMass1Unit(value);
            }}
            value={mass1Unit}
            items={massUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput placeholder="Initial Vel." onChangeText={setInitVelo1} />
          <CustomPicker
            onValueChange={(value) => {
              setInitVelo1Unit(value);
            }}
            value={initVelo1Unit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Final Vel."
            onChangeText={setFinVelo1}
            // value={finVelo1}
          />
          <CustomPicker
            onValueChange={(value) => {
              setFinVelo1Unit(value);
            }}
            value={finVelo1Unit}
            items={speedUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      <CustomView style={{ borderWidth: 3, width: 350 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="square" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Object 2</CustomText>
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Mass"
            onChangeText={setMass2}
            value={mass2}
          />
          <CustomPicker
            onValueChange={(value) => {
              setMass2Unit(value);
            }}
            value={mass2Unit}
            items={massUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Initial Vel."
            onChangeText={setInitVelo2}
            value={initVelo2}
          />
          <CustomPicker
            onValueChange={(value) => {
              setInitVelo2Unit(value);
            }}
            items={speedUnits}
            style={globalStyles.picker}
            value={initVelo2Unit}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Final Vel."
            onChangeText={setFinVelo2}
            value={finVelo2}
          />

          <CustomPicker
            onValueChange={(value) => {
              setFinVelo2Unit(value);
            }}
            items={speedUnits}
            value={finVelo2Unit}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {finalAnswer ? (
        <CustomView>
          <CustomText>{finalAnswerDesc}:</CustomText>
          <CustomText>{displayFinalAnswer()}</CustomText>
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
            <CustomTitle>Momentum Explained</CustomTitle>
            <CustomText>
              The linear conservation of momentum is a fundamental principle in
              classical mechanics that states that the total linear momentum of
              an isolated system remains constant if no external forces act on
              it. Linear momentum is the product of an object's mass and its
              velocity and is a vector quantity, meaning it has both magnitude
              and direction. Mathematically, the conservation of linear momentum
              can be expressed as:
            </CustomText>

            <CustomText style={{ alignSelf: "flex-start", fontSize: 20 }}>
              Momentum
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                initial
              </CustomText>{" "}
              = Momentum
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                final
              </CustomText>{" "}
            </CustomText>
            <CustomText>
              This principle holds true for systems of interacting particles or
              objects, where the net external force acting on the system is
              zero. In such cases, the total linear momentum before a collision
              or interaction is equal to the total linear momentum after the
              event.
            </CustomText>
            <CustomText>
              The linear conservation of momentum is a powerful tool in solving
              physics problems, particularly those involving collisions or
              explosions. When dealing with a system of particles, the sum of
              the individual momenta before an event is equal to the sum of the
              individual momenta after the event. This principle can be applied
              to solve for unknown variables such as velocities or masses.
            </CustomText>
            <CustomText>
              In the context of collisions, a partially elastic collision is one
              in which some kinetic energy is conserved while some is lost
              during the collision. When objects collide, momentum is always
              conserved according to the principle of conservation of momentum,
              which states that the total momentum of a closed system remains
              constant if no external forces act on it. However, in an elastic
              collision, not only is momentum conserved, but kinetic energy is
              also conserved. In contrast, in a partially elastic collision,
              momentum is conserved, but some kinetic energy is transformed into
              other forms of energy, such as heat or deformation of the
              colliding objects.
            </CustomText>
            <CustomText>
              Mathematically, in a partially elastic collision, the total
              kinetic energy of the system before the collision may not equal
              the total kinetic energy after the collision. Some of the initial
              kinetic energy is converted into other forms during the collision
              process. However, momentum is still conserved, meaning the total
              momentum of the system before and after the collision remains the
              same.
            </CustomText>
            <CustomText>
              For example, when two cars collide on a road, some of the initial
              kinetic energy of the cars is converted into sound, deformation of
              the cars, and heat due to friction. The momentum of the cars
              before the collision is equal to the momentum of the cars after
              the collision, but the total kinetic energy of the system
              decreases due to the conversion of kinetic energy into other
              forms. This is why partially elastic collisions are often
              described as having "less bounce" than elastic collisions, as some
              of the kinetic energy is lost in the process. The conservation of
              momentum analysis can be written as
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${m_1 u_{1i} + m_2 u_{2i} = m_1 u_{1f} + m_2 u_{2f}}$"}
            </MathJaxSvg>
            <CustomText>
              Here, m
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                1
              </CustomText>{" "}
              and m
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                2
              </CustomText>{" "}
              are the masses of the two objects. u
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                1i
              </CustomText>{" "}
              and u
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                2i
              </CustomText>{" "}
              are their initial velocities, while u
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                1f
              </CustomText>{" "}
              and u
              <CustomText style={{ fontSize: 10, textAlignVertical: "bottom" }}>
                2f
              </CustomText>{" "}
              are their final velocities.
            </CustomText>
            <CustomText>
              The linear conservation of momentum is a powerful tool in physics
              problem-solving, providing a systematic and quantitative approach
              to understanding the outcomes of collisions and interactions
              between objects. It is widely used in fields such as mechanics,
              astrophysics, and engineering to analyze and predict the behavior
              of systems with multiple interacting components.
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
