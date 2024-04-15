import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";

import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import CustomFavorite from "../../components/customFavorite";

export default function atomicMass() {
  // const [iso1, setIso1] = useState(null);
  // const [iso2, setIso2] = useState(null);
  // const [iso3, setIso3] = useState(null);
  // const [iso4, setIso4] = useState(null);
  // const [iso5, setIso5] = useState(null);

  // const [isoMass1, setIsoMass1] = useState(null);
  // const [isoMass2, setIsoMass2] = useState(null);
  // const [isoMass3, setIsoMass3] = useState(null);
  // const [isoMass4, setIsoMass4] = useState(null);
  // const [isoMass5, setIsoMass5] = useState(null);

  const [numElements, setNumElements] = useState(4);
  const [isotopes, setIsotopes] = useState({});

  const [mass, setMass] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateMass = () => {
    let weightArr = [];

    for (let i = 0; i < numElements; i++) {
      if (isotopes[`iso${i}`] && isotopes[`isoMass${i}`]) {
        weightArr.push(isotopes[`iso${i}`] * isotopes[`isoMass${i}`]);
      }
    }
    let weight = weightArr.reduce((a, b) => a + b, 0);
    setMass(weight.toFixed(3));
  };
  useEffect(() => {
    calculateMass();
  }, [isotopes]);

  const updateMass = (i, value) => {
    const obj = { ...isotopes };
    obj["iso" + i] = value;
    setIsotopes(obj);
  };

  const updatePercentage = (i, value) => {
    const obj = { ...isotopes };
    obj["isoMass" + i] = value;
    setIsotopes(obj);
  };

  const displayInputs = () => {
    return Array(numElements)
      .fill(0)
      .map((item, i) => {
        return (
          <CustomView
            key={i}
            style={{
              gap: 0,
              padding: 5,
            }}
          >
            <CustomView dir="horiz">
              <MaterialIcons name="science" style={globalStyles.matIcon} />
              <CustomText style={[globalStyles.heading]}>
                Isotope {i + 1}
              </CustomText>
            </CustomView>
            <CustomView dir="horiz" style={{ minWidth: "100%", flex: 1 }}>
              <CustomInput
                placeholder="Mass"
                onChangeText={(value) => updateMass(i, value)}
                style={{ flex: 1 }}
              />
              <CustomInput
                placeholder="Percentage"
                onChangeText={(value) => updatePercentage(i, value)}
                style={{ flex: 1 }}
              />
            </CustomView>
          </CustomView>
        );
      });
  };

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Atomic Mass</CustomTitle>
        <CustomFavorite name="atomicMass" />
      </CustomView>

      <CustomText>
        What is the average atomic mass of an element based on the abundance
        percentage of each isotope?
      </CustomText>

      <CustomView
        style={{
          borderWidth: 2,
        }}
      >
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
            <CustomTitle>Average Atomic Mass Explained</CustomTitle>
            <CustomText>
              Average atomic mass, also known as atomic weight, is a concept in
              chemistry that accounts for the presence of isotopes in the
              calculation of the mass of an element. Isotopes are atoms of the
              same element that have different numbers of neutrons, resulting in
              variations in atomic mass. The average atomic mass considers both
              the mass and the abundance of each isotope to provide a weighted
              average that reflects the distribution of isotopes in a naturally
              occurring sample.
            </CustomText>
            <CustomText>
              The atomic mass listed on the periodic table for each element is,
              in fact, the weighted average of the masses of all naturally
              occurring isotopes of that element. The calculation involves
              multiplying the mass of each isotope by its relative abundance
              (expressed as a decimal), summing these values for all isotopes,
              and obtaining the average.
            </CustomText>
            <CustomText>
              For example, chlorine has two stable isotopes: chlorine-35 (^35Cl)
              and chlorine-37 (^37Cl). The atomic mass listed on the periodic
              table is approximately 35.45 g/mol. This value is a weighted
              average, considering that ^35Cl is more abundant in nature. The
              calculation involves accounting for the natural abundance of each
              isotope in the chlorine sample.
            </CustomText>
            <CustomText>
              The concept of average atomic mass is particularly significant in
              chemistry, as it provides a more accurate representation of the
              mass of an element than simply using the mass of a single isotope.
              It is essential for precise stoichiometric calculations in
              chemical reactions and contributes to our understanding of the
              composition of naturally occurring elements. The ability to
              experimentally determine isotope abundances has advanced with
              technological developments, contributing to more accurate values
              for average atomic masses.
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
