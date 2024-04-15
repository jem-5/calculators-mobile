import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView } from "react-native";
import CustomPressable from "../../components/customPressable";
import CustomPicker from "../../components/customPicker";
import { tempUnits } from "../../utils/units";
import { convertTempToC } from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function BeverageCooling() {
  const [ambient, setAmbient] = useState("25");
  const [ambientUnit, setAmbientUnit] = useState("Celsius (C)");

  const [initial, setInitial] = useState("70");
  const [initialUnit, setInitialUnit] = useState("Celsius (C)");

  const [vessel, setVessel] = useState("Plastic Cup");
  const [beverage, setBeverage] = useState("Coffee");

  const [time, setTime] = useState(3);
  const [finalTime, setFinalTime] = useState("");
  const [temp, setTemp] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const heatCapacityOptions = useMemo(() => {
    return {
      Water: 4.18,
      Coffee: 4.18,
      Tea: 4.18,
      "Hot Chocolate": 3.93,
      Milk: 3.93,
    };
  }, []);

  const heatCapacities = [];
  Object.keys(heatCapacityOptions).forEach((item) =>
    heatCapacities.push({
      label: item,
      value: item,
    })
  );

  const heatTransferCoefficientOptions = useMemo(() => {
    return {
      "Plastic Cup": 3.0,
      "Paper Cup": 2.5,
      "Styrofoam Cup": 1.5,
      "Ceramic Mug": 5.0,
      "Glass Mug": 7.0,
      "Stainless Steel Tumbler": 10.0,
      "Vacuum Insulated Tumbler": 0.5,
    };
  }, []);

  const heatTransferCoeffs = [];
  Object.keys(heatTransferCoefficientOptions).forEach((item) => {
    heatTransferCoeffs.push({
      label: item,
      value: item,
    });
  });

  const surfaceAreaOptions = useMemo(() => {
    return {
      "Plastic Cup": 0.03,
      "Paper Cup": 0.04,
      "Styrofoam Cup": 0.04,
      "Ceramic Mug": 0.06,
      "Glass Mug": 0.07,
      "Stainless Steel Tumbler": 0.08,
      "Vacuum Insulated Tumbler": 0.08,
    };
  }, []);

  const surfaceAreas = [];
  Object.keys(surfaceAreaOptions).forEach((item) => {
    surfaceAreas.push({
      label: item,
      value: item,
    });
  });

  useEffect(() => {
    const cAmbient = convertTempToC(ambient, ambientUnit);
    const cInitial = convertTempToC(initial, initialUnit);
    const heatTransferCoeff = heatTransferCoefficientOptions[vessel];
    const surfArea = surfaceAreaOptions[vessel];
    const heatCap = heatCapacityOptions[beverage];
    const coolingConstant = (+heatTransferCoeff * +surfArea) / +heatCap;
    const presentTemp =
      +cAmbient +
      (+cInitial - cAmbient) *
        Math.exp(-1 * coolingConstant * parseFloat(time));
    setTemp(presentTemp);

    const totalTime =
      Math.log(0.05 / (+cInitial - +cAmbient)) / (-1 * coolingConstant);
    setFinalTime(totalTime.toFixed(3));
  }, [
    ambient,
    ambientUnit,
    initial,
    initialUnit,
    heatTransferCoefficientOptions,
    vessel,
    surfaceAreas,
    heatCapacities,
    beverage,
    time,
  ]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Beverage Cooling</CustomTitle>
        <CustomFavorite name="beverageCooling" />
      </CustomView>

      <CustomText>
        Investigate how quickly a hot beverage will cool off.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Ambient Temperature"
            onChangeText={setAmbient}
            value={ambient}
          />
          <CustomPicker
            onValueChange={(value) => {
              setAmbientUnit(value);
            }}
            value={ambientUnit}
            items={tempUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Beverage Temperature"
            onChangeText={setInitial}
            value={initial}
          />
          <CustomPicker
            onValueChange={(value) => {
              setInitialUnit(value);
            }}
            value={initialUnit}
            items={tempUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomPicker
            onValueChange={(value) => {
              setVessel(value);
            }}
            value={vessel}
            items={heatTransferCoeffs}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomPicker
            onValueChange={(value) => {
              setBeverage(value);
            }}
            value={beverage}
            items={heatCapacities}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {finalTime ? (
        <>
          <CustomText>Total Time to Equilibrium: {finalTime} s</CustomText>
        </>
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
            <CustomTitle>Beverage Cooling Explained</CustomTitle>
            <CustomText>
              The time it takes for a hot drink to reach equilibrium, or cool
              off, is influenced by various factors such as the initial
              temperature of the drink, the ambient temperature, the vessel it's
              in, and the heat capacity of the liquid inside. The process of
              cooling follows principles of heat transfer and thermodynamics,
              and one can use Newton's Law of Cooling to model this phenomenon.
            </CustomText>
            <CustomText>Newton's Law of Cooling is expressed as:</CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${T(t)} = {T_a} + {(T_0 - T_a)} \\cdot e^{(-kt)}$"}
            </MathJaxSvg>

            <CustomText>where</CustomText>
            <CustomText>
              T(t) is the temperature of the drink at time t
            </CustomText>
            <CustomText>
              T
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                a
              </CustomText>{" "}
              is the ambient temperature
            </CustomText>
            <CustomText>
              T
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                0
              </CustomText>{" "}
              is the initial temperature of the drink
            </CustomText>

            <CustomText>
              k is a constant related to the specific cooling characteristics of
              the system
            </CustomText>

            <CustomText>t is time</CustomText>

            <CustomText>
              The time it takes for the drink to reach equilibrium can be
              estimated by finding the time t when T(t) is close to T
              <CustomText style={{ fontSize: 15, textAlignVertical: "bottom" }}>
                a
              </CustomText>
              . This process involves solving the exponential equation for t.
              It's important to note that the heat capacity of the liquid
              inside, which influences the rate of temperature change, is
              implicitly captured in the constant k.
            </CustomText>
            <CustomText>
              In more complex situations, where additional factors such as the
              shape and material of the vessel or the surrounding environment's
              heat conduction are considered, more sophisticated heat transfer
              models may be needed. These can involve differential equations and
              considerations of conduction, convection, and radiation.
            </CustomText>
            <CustomText>
              In practical terms, when calculating the time for a hot drink to
              cool off, one may need to make simplifying assumptions or use
              empirical data to determine the constants in the cooling model.
              Experiments can be conducted to measure the rate of cooling under
              controlled conditions, and the results can be used to refine the
              model for more accurate predictions.
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
