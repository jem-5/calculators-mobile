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
import CustomFavorite from "../../components/customFavorite";

export default function MolarMass() {
  const [numElements, setNumElements] = useState(4);
  const [elements, setElements] = useState({});

  const [mass, setMass] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const findMolecularWeight = () => {
    let weightArr = [];

    for (let i = 0; i < numElements; i++) {
      if (elements[`elem${i}`] && elements[`elemMass${i}`]) {
        weightArr.push(elements[`elem${i}`] * elements[`elemMass${i}`]);
      }
    }
    let weight = weightArr.reduce((a, b) => a + b, 0);
    setMass(weight.toFixed(3));
  };

  useEffect(() => {
    findMolecularWeight();
  }, [elements]);

  const updateQuantity = (i, value) => {
    const obj = { ...elements };
    obj["elem" + i] = value;
    setElements(obj);
  };

  const updateMass = (i, value) => {
    const obj = { ...elements };
    obj["elemMass" + i] = value;
    setElements(obj);
  };

  const displayInputs = () => {
    return Array(numElements)
      .fill(0)
      .map((item, i) => {
        return (
          <CustomView key={i} style={{ gap: 0, padding: 5 }}>
            <CustomView dir="horiz">
              <MaterialIcons name="science" style={globalStyles.matIcon} />
              <CustomText style={[globalStyles.heading]}>
                Element {i + 1}
              </CustomText>
            </CustomView>
            <CustomView dir="horiz">
              <CustomInput
                placeholder="Quantity"
                onChangeText={(value) => updateQuantity(i, value)}
              />

              <CustomPicker
                onValueChange={(value) => updateMass(i, value)}
                items={massOfElements}
                placeholder={{ label: "Select an element", value: 0 }}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>
          </CustomView>
        );
      });
  };

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Molar Mass</CustomTitle>
        <CustomFavorite name="molarMass" />
      </CustomView>

      <CustomText>
        What is the weight of 1 mole of any chemical compound? Enter the
        quantity (in moles) of each element.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        {displayInputs()}
        <CustomPressable
          icon="plus"
          onPress={() => setNumElements(+numElements + 1)}
        >
          Add element
        </CustomPressable>
      </CustomView>

      {mass > 0 ? <CustomText>Mass: {mass} grams/mole</CustomText> : null}
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
            <CustomTitle>Molar Mass Explained</CustomTitle>
            <CustomText>
              Molar mass is a fundamental concept in chemistry that plays a
              crucial role in various chemical calculations and is essential for
              understanding the behavior of substances on a molecular level.
              Molar mass is defined as the mass of one mole of a substance and
              is expressed in units of grams per mole (g/mol). This quantity
              represents the average mass of all the atoms or molecules in a
              sample, taking into account their relative abundances.
            </CustomText>
            <CustomText>
              To calculate the molar mass of a compound, one adds up the atomic
              masses of all the atoms present in a molecule, considering the
              number of times each type of atom occurs. The atomic masses are
              usually taken from the periodic table. For example, the molar mass
              of water (H₂O) can be calculated by adding the atomic masses of
              two hydrogen atoms and one oxygen atom.{" "}
            </CustomText>
            <CustomText>
              Molar mass is a versatile concept used in various aspects of
              chemistry, such as determining the amount of substance in a given
              mass (moles = mass/molar mass), stoichiometry calculations, and
              understanding the physical properties of gases. It is particularly
              valuable in quantitative chemistry, where precise measurements of
              mass are essential for accurate chemical analysis.
            </CustomText>
            <CustomText>
              In the context of chemical reactions, the concept of molar mass is
              pivotal in understanding the relationships between reactants and
              products. Stoichiometry, the study of quantitative relationships
              in chemical reactions, relies on molar masses to balance equations
              and predict the amounts of substances involved. Additionally,
              molar mass is a key factor in the ideal gas law, which describes
              the behavior of gases under varying conditions.
            </CustomText>
            <CustomText>
              In summary, the analysis of molar mass extends across various
              branches of chemistry, facilitating the understanding and
              manipulation of chemical substances in laboratory and theoretical
              settings.
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
