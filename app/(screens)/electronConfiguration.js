import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import electronConfigData from "../../data/electronData";
import CustomFavorite from "../../components/customFavorite";

export default function ElectronConfiguration() {
  const [element, setElement] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const getConfiguration = () => {
    return element;
  };

  useEffect(() => {
    getConfiguration();
  }, element);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Electron Configuration</CustomTitle>
        <CustomFavorite name="electronConfiguration" />
      </CustomView>
      <CustomText>
        Pick any element and find the distribution of electrons in it.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 1: </CustomText>

          <CustomPicker
            onValueChange={(value) => setElement(value)}
            items={electronConfigData}
            placeholder={{ label: "Select an element", value: 0 }}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>
      </CustomView>

      <CustomPressable
        icon="bulb1"
        onPress={() => setModalVisible(!modalVisible)}
      >
        Learn more
      </CustomPressable>

      {element ? (
        <CustomView>
          <CustomText>Electron Data:</CustomText>

          <CustomText>Atomic Mass: {element.atomicMass}</CustomText>
          <CustomText>Atomic Number: {element.atomicMass}</CustomText>
          <CustomText>
            Electron Configuration: {element.electronConfig}
          </CustomText>
          <CustomText>Valence Electrons: {element.valenceElectrons}</CustomText>
        </CustomView>
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
            <CustomTitle>Electron Configuration Explained</CustomTitle>
            <CustomText>
              Electron configuration is a representation of how electrons are
              distributed among the energy levels, or shells, in an atom. It
              describes the specific arrangement of electrons in an atom,
              detailing which energy levels contain electrons and how many
              electrons are in each level. The electron configuration is crucial
              for understanding the chemical behavior and properties of
              elements.
            </CustomText>
            <CustomText>
              In an atom, electrons occupy energy levels or shells labeled with
              the principal quantum number (n). The first energy level (n = 1)
              is closest to the nucleus, followed by subsequent levels (n = 2,
              3, 4, and so on) that are progressively farther away. Each energy
              level can accommodate a certain maximum number of electrons, given
              by the formula 2n^2. The first energy level (n = 1) can hold up to
              2 electrons, the second (n = 2) can hold up to 8 electrons, and so
              forth.
            </CustomText>
            <CustomText>
              The electron configuration is often written using a notation that
              includes the principal quantum number and the subshell
              designation. The subshells are denoted by the letters s, p, d, and
              f, each corresponding to a different orbital shape. For example,
              the electron configuration of carbon (C) is 1s² 2s² 2p²,
              indicating that there are two electrons in the first energy level
              (1s²) and four electrons in the second energy level (2s² 2p²).
            </CustomText>
            <CustomText>
              Valence electrons are the electrons in the outermost energy level
              of an atom. These electrons are crucial in determining the
              chemical properties and reactivity of an element. The number of
              valence electrons corresponds to the group number of an element in
              the periodic table. For example, elements in Group 1 (such as
              hydrogen and lithium) have one valence electron, while elements in
              Group 18 (such as helium and neon) have eight valence electrons.
            </CustomText>
            <CustomText>
              Understanding the electron configuration and valence electrons is
              essential for predicting how atoms will interact to form chemical
              bonds. Elements with similar electron configurations often exhibit
              similar chemical behaviors, and the arrangement of electrons in
              different orbitals influences the formation of compounds and the
              sharing or transfer of electrons in chemical reactions. The
              concept of electron configuration is a fundamental aspect of
              chemistry that helps explain the diversity and predictability of
              the chemical properties of elements.
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
