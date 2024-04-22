import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ScrollView, View } from "react-native";
import CustomPressable from "../../components/customPressable";
import elementElectronegativities from "../../data/elementElectronegativity";
import CustomFavorite from "../../components/customFavorite";

export default function Electronegativity() {
  const [firstElement, setFirstElement] = useState(null);
  const [secondElement, setSecondElement] = useState(null);
  const [bond, setBond] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const findBondNature = () => {
    console.log(firstElement, secondElement);
    const diff = Math.abs(firstElement - secondElement);
    if (diff > 1.8) {
      setBond("ionic");
    } else if (diff < 0.4) {
      setBond("nonpolar covalent");
    } else {
      setBond("polar covalent");
    }
  };

  useEffect(() => {
    if (firstElement && secondElement) {
      findBondNature();
    }
  }, [firstElement, secondElement]);

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Electronegativity</CustomTitle>
        <CustomFavorite name="electronegativity" />
      </CustomView>

      <CustomText>
        Pick any two elements & find out what type of bond will be formed by
        them.
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350, gap: 20 }}>
        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 1: </CustomText>
          <CustomPicker
            onValueChange={(value) => setFirstElement(value)}
            items={elementElectronegativities}
            placeholder={{ label: "Select an element", value: 0 }}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <CustomView dir="horiz">
          <MaterialIcons name="science" style={globalStyles.matIcon} />
          <CustomText style={[globalStyles.heading]}>Element 2: </CustomText>

          <CustomPicker
            onValueChange={(value) => setSecondElement(value)}
            items={elementElectronegativities}
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

      {bond ? <CustomText>Bond Type: {bond}</CustomText> : null}

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
            <CustomTitle>Electronegativity Explained</CustomTitle>
            <CustomText>
              Electronegativity is a fundamental property of elements that
              measures their ability to attract electrons in a chemical bond. It
              plays a crucial role in predicting the type of bond that forms
              between two elements in a compound. The electronegativity values,
              usually assigned based on the Pauling scale, range from 0.7 for
              cesium to 4.0 for fluorine. The larger the electronegativity
              difference between two elements, the more polar the bond, and the
              more likely an ionic or polar covalent bond will form.
            </CustomText>
            <CustomText>
              In general, when the electronegativity difference between two
              elements is large (typically greater than 1.7), an ionic bond is
              formed. In ionic bonding, electrons are transferred from the less
              electronegative element to the more electronegative one, resulting
              in the formation of positively charged cations and negatively
              charged anions. These ions are attracted to each other due to
              their opposite charges, forming an ionic compound with a
              characteristic crystalline structure.
            </CustomText>
            <CustomText>
              Conversely, when the electronegativity difference is smaller
              (between 0.4 and 1.7), a polar covalent bond is likely to form. In
              polar covalent bonds, electrons are shared between the atoms, but
              the sharing is unequal due to the differing electronegativities.
              As a result, one atom attracts the shared electrons more strongly,
              creating a partial negative charge (δ-) on that atom and a partial
              positive charge (δ+) on the other. Water (H2O) is a classic
              example of a molecule with polar covalent bonds.
            </CustomText>
            <CustomText>
              When the electronegativity difference is very small (typically
              less than 0.4), the bond is considered nonpolar covalent. In
              nonpolar covalent bonds, electrons are shared equally between the
              atoms, and there is no significant difference in charge
              distribution. Diatomic molecules like hydrogen (H2) or oxygen (O2)
              exhibit nonpolar covalent bonds.
            </CustomText>
            <CustomText>
              Understanding electronegativity and its role in bond formation
              provides valuable insights into the chemical behavior of
              substances. It helps predict the nature of chemical bonds, the
              type of compounds formed, and even influences the physical
              properties of materials. The concept of electronegativity is an
              essential tool for chemists in rationalizing and predicting the
              behavior of elements in various chemical environments.
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
