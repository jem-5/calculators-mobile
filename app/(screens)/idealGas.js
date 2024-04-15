import nerdamer from "nerdamer/nerdamer.core.js";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import "nerdamer/Solve.js";

import React, { useEffect, useMemo, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import { tempUnits, pressureUnits, volumeUnits } from "../../utils/units";
import {
  convertPressure,
  convertTemp,
  convertVol,
} from "../../utils/conversions";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function IdealGas() {
  const [pressure, setPressure] = useState("");
  const [pressureUnit, setPressureUnit] = useState("pascals (Pa)");

  const [vol, setVol] = useState("");
  const [volUnit, setVolUnit] = useState("cubic meters");

  const [moles, setMoles] = useState("");

  const [temp, setTemp] = useState("");
  const [tempUnit, setTempUnit] = useState("Kelvin (K)");

  const [missingVar, setMissingVar] = useState(null);

  const [calcDone, setCalcDone] = useState(false);
  const [missingVal, setMissingVal] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const getNameDesc = {
    cPressure: "pressure (Pa) of the gas",
    cVol: "volume (cubic meters) of the gas",
    moles: "amount of the gas in moles",
    cTemp: "temperature (degrees Kelvin) of the gas",
  };

  useEffect(() => {
    const calculateGasEquation = () => {
      const cPressure = convertPressure(pressure, pressureUnit);
      const cVol = convertVol(vol, volUnit);
      const cTemp = convertTemp(temp, tempUnit);

      const allVariables = {
        cPressure,
        cVol,
        moles,
        cTemp,
      };

      const index = Object.values(allVariables).findIndex(
        (item) => item === ""
      );
      const key = Object.keys(allVariables)[index];
      setMissingVar(key);

      const missingValue = nerdamer.solveEquations(
        "cPressure * cVol = moles * 8.31446261815324 * cTemp",
        key
      );
      console.log(missingValue.toString());
      const expression1 = nerdamer(missingValue.toString(), allVariables);
      const num = parseFloat(expression1.text()).toFixed(3);
      setMissingVal(num);
      return num;
    };

    const variables = [pressure, vol, moles, temp];
    const numberEmptyVars = variables.filter((item) => item === "");
    if (numberEmptyVars.length === 1) {
      setCalcDone(true);
      calculateGasEquation();
    }
  }, [pressure, vol, temp, moles, pressureUnit, volUnit, tempUnit, calcDone]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Ideal Gas</CustomTitle>
        <CustomFavorite name="idealGas" />
      </CustomView>
      <CustomText>
        {" "}
        Analyze a gas that satisfies the conditions for ideality (large number
        of molecules, point particle molecules, non-interacting molecules,
        perfectly elastic collisions, compliant with Newton's laws.)
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Pressure"
            onChangeText={setPressure}
            value={pressure}
          />
          <CustomPicker
            onValueChange={(value) => {
              setPressureUnit(value);
            }}
            value={pressureUnit}
            items={pressureUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput placeholder="Volume" onChangeText={setVol} value={vol} />
          <CustomPicker
            onValueChange={(value) => {
              setVolUnit(value);
            }}
            value={volUnit}
            items={volumeUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Quantity (moles)"
            onChangeText={setMoles}
            value={moles}
          />
          {/* <CustomPicker
            onValueChange={(value) => {
              setMo(value);
            }}
            value={pressureUnit}
            items={pressureUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          /> */}
        </CustomView>

        <CustomView dir="horiz">
          <CustomInput
            placeholder="Temperature"
            onChangeText={setTemp}
            value={temp}
          />
          <CustomPicker
            onValueChange={(value) => {
              setTempUnit(value);
            }}
            value={tempUnit}
            items={tempUnits}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {calcDone ? (
        <View>
          <CustomText>
            The missing variable is {getNameDesc[missingVar]}: {missingVal}
          </CustomText>
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
            <CustomTitle>Ideal Gas Explained</CustomTitle>
            <CustomText>
              Performing an ideal gas analysis involves using the ideal gas law,
              which describes the behavior of an ideal gas under various
              conditions. The ideal gas law is typically expressed as
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"$ {PV = nRT}$"}
            </MathJaxSvg>
            <CustomText>where</CustomText>
            <CustomText>is the pressure of the gas</CustomText>
            <CustomText>V is the volume it occupies</CustomText>
            <CustomText>n is the number of moles of gas</CustomText>
            <CustomText>R is the ideal gas constant</CustomText>
            <CustomText>
              T is the temperature of the gas measured in Kelvin
            </CustomText>

            <CustomText>
              This equation allows you to calculate any of the four variables
              (P, V, n or T) if the other three are known.
            </CustomText>

            <CustomText>
              It's important to note that when using the ideal gas law, the
              units must be consistent. Pressure is typically measured in
              pascals (Pa), volume in cubic meters (m³), temperature in Kelvin
              (K), and the number of moles is a dimensionless quantity.
            </CustomText>
            <CustomText>
              This ideal gas analysis is particularly useful in various
              scientific and engineering applications, such as in chemistry
              labs, where the behavior of gases is crucial for understanding
              chemical reactions. Additionally, it's widely applied in fields
              like thermodynamics and fluid mechanics for modeling and analyzing
              the behavior of gases under different conditions.
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
