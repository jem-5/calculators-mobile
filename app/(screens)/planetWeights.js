import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import { weightUnits } from "../../utils/units";
import { convertWeight } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function PlanetWeights() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("pounds (lbs)");
  const [calcDone, setCalcDone] = useState(false);
  const [weights, setWeights] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const surfaceGravity = useMemo(() => {
    return {
      Mercury: 3.7,
      Venus: 8.87,
      Earth: 9.81,
      Mars: 3.71,
      Jupiter: 24.79,
      Saturn: 10.44,
      Uranus: 8.87,
      Neptune: 11.15,
      Pluto: 0.62,
    };
  }, []);

  useEffect(() => {
    setCalcDone(false);
    if (weight) {
      const convertedWeight = convertWeight(weight, weightUnit);
      const newArr = Object.values(surfaceGravity).map((item, i) => {
        const newWeight = (item / 9.81) * convertedWeight;
        return newWeight.toFixed(3);
      });
      setWeights(newArr);
      setCalcDone(true);
    }
  }, [weight, surfaceGravity, weightUnit]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Weight on other Planets</CustomTitle>
        <CustomFavorite name="planetWeights" />
      </CustomView>

      <CustomText>
        How does your weight vary from one planet to another? Enter your current
        weight on Earth and find out your weight on other planets.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="square" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>
            Enter your weight
          </CustomText>
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Weight"
            onChangeText={setWeight}
            // value={weight}
          />
          <CustomPicker
            onValueChange={(value) => {
              setWeightUnit(value);
              // setWeight(String(convertWeight(weight, value)));
            }}
            value={weightUnit}
            items={weightUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {weights ? (
        <CustomView>
          <CustomText>Planet: Weight (lbs)</CustomText>
          {[...weights].map((item, i) => {
            return (
              <CustomText>
                {Object.keys(surfaceGravity)[i]}: {item}
              </CustomText>
            );
          })}
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
            <CustomTitle>Planet Weight Explained</CustomTitle>
            <CustomText>
              Determining someone's weight on different planets involves
              understanding the concept of gravitational force and how it varies
              across celestial bodies. On Earth, weight is the measure of the
              gravitational force exerted by the planet on an object. This force
              is directly proportional to the object's mass and inversely
              proportional to the square of the distance between the object's
              center of mass and the center of the planet.
            </CustomText>
            <CustomText>
              To calculate someone's weight on a different planet, you can use
              the formula:
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${W = m \\cdot g}$"}
            </MathJaxSvg>

            <CustomText>where W is the weight of the object</CustomText>
            <CustomText>m is the mass of the object</CustomText>
            <CustomText>
              g is the acceleration due to gravity on the planet
            </CustomText>
            <CustomText>
              The acceleration due to gravity g varies from planet to planet.
              For instance, on Earth, g is approximately 9.81 m/s^2. On other
              celestial bodies, such as Mars or the Moon, g is different due to
              variations in mass and radius.
            </CustomText>
            <CustomText>
              To determine someone's weight on a different planet, you would
              first calculate their mass, typically measured in kilograms. Then,
              you would use the known acceleration due to gravity of the target
              planet to compute their weight. For example, on Mars, where g is
              approximately 3.71 m/s^2, a person with a mass of 70 kg would
              weigh
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${W_{Mars} = mg = 70 \\cdot 3.71 = 260N}$"}
            </MathJaxSvg>

            <CustomText>
              This means that on Mars, the person would weigh approximately 260
              N, or about 26.5% of their weight on Earth. Similarly, you can
              calculate weights on other celestial bodies by using their
              respective values for g.
            </CustomText>
            <CustomText>
              Understanding how weight varies across different planets not only
              provides insight into celestial mechanics but also has practical
              implications for space exploration, such as designing equipment
              and spacecraft that can function effectively under different
              gravitational conditions.
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
