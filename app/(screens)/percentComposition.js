import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import massOfElements from "../../data/elementMass";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";

import PieChart from "react-native-pie-chart";
import CustomFavorite from "../../components/customFavorite";

export default function PercentComposition() {
  const [elementOne, setElementOne] = useState("");
  const [quantityElementOne, setQuantityElementOne] = useState("");
  const [elementTwo, setElementTwo] = useState("");
  const [quantityElementTwo, setQuantityElementTwo] = useState("");
  const [elementThree, setElementThree] = useState("");
  const [quantityElementThree, setQuantityElementThree] = useState("");
  const [elementFour, setElementFour] = useState("");
  const [quantityElementFour, setQuantityElementFour] = useState("");
  const [mass, setMass] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartColors, setChartColors] = useState([]);

  const findMolecularWeight = () => {
    const weight =
      elementOne * quantityElementOne +
      elementTwo * quantityElementTwo +
      elementThree * quantityElementThree +
      elementFour * quantityElementFour;
    setMass(weight.toFixed(3));
  };

  const updateChart = () => {
    let weight1 = elementOne * quantityElementOne;
    let weight2 = elementTwo * quantityElementTwo;
    let weight3 = elementThree * quantityElementThree;
    let weight4 = elementFour * quantityElementFour;
    let chart = [weight1];
    chart.push(weight2);
    chart.push(weight3);
    chart.push(weight4);
    setChartData(chart.filter((i) => i !== 0));
    let colors = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];
    let index = chartData.length;
    setChartColors(colors.slice(0, index + 1));
  };

  useEffect(() => {
    findMolecularWeight();
    updateChart();
  }, [
    elementOne,
    quantityElementOne,
    elementTwo,
    quantityElementTwo,
    elementThree,
    quantityElementThree,
    elementFour,
    quantityElementFour,
  ]);

  console.log(elementOne);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Percent Composition</CustomTitle>
        <CustomFavorite name="percentComposition" />
      </CustomView>

      <CustomText>
        Enter the number of each element in a molecule and visualize the percent
        composition by mass of the molecule.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 1</CustomText>
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            placeholder="Quantity"
            onChangeText={setQuantityElementOne}
            value={quantityElementOne}
          />

          <CustomPicker
            onValueChange={(value) => setElementOne(value)}
            items={massOfElements}
            placeholder={{ label: "Select an element", value: 0 }}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 2</CustomText>
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            onChangeText={setQuantityElementTwo}
            value={quantityElementTwo}
            placeholder="Quantity"
          />
          <CustomPicker
            onValueChange={(value) => setElementTwo(value)}
            items={massOfElements}
            placeholder={{ label: "Select an element", value: 0 }}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 3</CustomText>
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            onChangeText={setQuantityElementThree}
            value={quantityElementThree}
            placeholder="Quantity"
          />
          <CustomPicker
            useNativeAndroidPickerStyle={false}
            style={globalStyles.picker}
            onValueChange={(value) => setElementThree(value)}
            items={massOfElements}
            placeholder={{ label: "Select an element", value: 0 }}
          />
        </CustomView>

        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 4</CustomText>
        </CustomView>
        <CustomView dir="horiz">
          <CustomInput
            onChangeText={setQuantityElementFour}
            value={quantityElementFour}
            placeholder="Quantity"
          />
          <CustomPicker
            onValueChange={(value) => setElementFour(value)}
            items={massOfElements}
            placeholder={{ label: "Select an element", value: 0 }}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      {/* <CustomPressable icon="calculator" url="" onPress={findMolecularWeight}>
        Find percent composition
      </CustomPressable> */}

      <CustomPressable
        icon="bulb1"
        onPress={() => setModalVisible(!modalVisible)}
      >
        Learn more
      </CustomPressable>

      {mass > 0 ? <CustomText>Total Mass: {mass} grams/mole</CustomText> : null}

      {chartData.length > 0 && chartColors.length === chartData.length ? (
        <PieChart
          widthAndHeight={250}
          series={chartData}
          sliceColor={chartColors}
        />
      ) : null}
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
            <CustomTitle>Percent Composition Explained</CustomTitle>
            <CustomText>
              The percent composition by mass of a molecule is a fundamental
              concept in chemistry that provides insights into the relative
              abundance of elements within a compound. It is defined as the
              percentage of the total mass of a compound that comes from each
              individual element present in that compound. The percent
              composition is a critical factor in understanding and
              characterizing chemical compounds, as it helps elucidate their
              properties and behaviors.
            </CustomText>
            <CustomText>
              To calculate the percent composition by mass of a molecule, one
              must first determine the molar mass of the compound. The molar
              mass is the mass of one mole of the substance and is obtained by
              summing the atomic masses of all the atoms present in the
              molecular formula. The percent composition of each element is then
              calculated by dividing the mass contributed by that element by the
              total molar mass of the compound and multiplying by 100 to express
              the result as a percentage.
            </CustomText>
            <CustomText>
              For example, consider water (H₂O). The molar mass of water is
              obtained by adding the molar masses of two hydrogen atoms (each
              with a molar mass of approximately 1 g/mol) and one oxygen atom
              (with a molar mass of approximately 16 g/mol). The total molar
              mass of water is then 18 g/mol. The percent composition of
              hydrogen in water is calculated as (2 g / 18 g) * 100 ≈ 11.1%, and
              the percent composition of oxygen is (16 g / 18 g) * 100 ≈ 88.9%.
            </CustomText>
            <CustomText>
              Understanding percent composition is valuable in various aspects
              of chemistry. It aids in determining the stoichiometry of chemical
              reactions, predicting the behavior of substances in reactions, and
              identifying unknown compounds based on experimental data. Percent
              composition is also crucial in analytical chemistry, where it is
              used to assess the purity of synthesized compounds or to quantify
              the composition of complex mixtures.
            </CustomText>
            <CustomText>
              In summary, percent composition by mass is a fundamental concept
              that provides a quantitative understanding of the elemental makeup
              of chemical compounds. It is a key tool for chemists in
              characterizing substances and predicting their behavior in diverse
              chemical processes.
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
