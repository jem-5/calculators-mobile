import { Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { globalStyles } from "../../styles/global";
import CustomPressable from "../../components/customPressable";
import CustomView from "../../components/customView";
import CustomText from "../../components/customText";
import CustomTitle from "../../components/customTitle";
import GirlCalcImg from "../../assets/images/girl-calc.png";
import Chemistry from "../../assets/images/chemistry.jpg";
import Physics from "../../assets/images/physics.jpg";
import Fluids from "../../assets/images/fluids.jpg";
import Heat from "../../assets/images/heat.jpg";

import * as Progress from "react-native-progress";
import CustomInput from "../../components/customInput";
import allCalculators from "../../data/allCalculators";
import useThemeColors from "../../hooks/useThemeColors";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Category from "./category";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

export default function Dashboard() {
  const auth = getAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const updateModal = () => {
    setModalVisible(!modalVisible);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setName(user.displayName);
      const lastLog = new Date(user.metadata.lastSignInTime);
      setLastLogin(lastLog.toDateString().split(" ").slice(1).join(" "));
    } else {
      setName(null);
    }
  });

  const colors = useThemeColors();

  const categoryImages = {
    width: 100,
    height: 100,
    borderRadius: 20,
  };
  const categoryView = {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.text.color,
    width: 175,
    height: 175,
    padding: 0,
  };
  const categoryPressable = {
    backgroundColor: "transparent",
    elevation: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 0,
  };
  const categoryText = {
    textAlign: "center",
    fontSize: 14,
  };

  const tools = [
    {
      name: "Engineering Constants",
      url: "constants",
      description:
        "A list of the top 30 physics and mathematics constants along with their values and brief descriptions",
      icon: <MaterialIcons name="engineering" size={24} />,
    },
    {
      name: "Unit Conversions",
      url: "conversions",
      description:
        "A handy list of unit conversions for various common measurements",
      icon: <FontAwesome name="exchange" size={24} />,
    },
    {
      name: "Greek Letters",
      url: "greekLetters",
      description:
        "A useful list of the Greek alphabet letters along with the measurements or concepts they typically represent",
      icon: <MaterialCommunityIcons name="alphabet-greek" size={24} />,
    },
    {
      name: "Essential Equations",
      url: "equations",
      description:
        "A list of essential engineering & math equations, along with their assumptions, application and usage.",
      icon: <SimpleLineIcons name="chemistry" size={24} />,
    },
  ];
  const displayTools = () => {
    return tools.map((item, i) => {
      return (
        <CustomView
          key={i}
          style={{
            minWidth: "100%",
            borderWidth: 1,
            borderColor: colors.text.color,
            marginTop: 5,
            borderRadius: 25,
            padding: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => router.navigate(item.url)}
            style={{ minWidth: "100%" }}
          >
            <CustomView>
              <CustomText
                style={{
                  fontSize: 20,
                  alignSelf: "flex-start",
                  color: "rgb(41, 214, 252);",
                  fontWeight: "bold",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                {item.icon} {item.name}
              </CustomText>
              <CustomText
                style={{ fontSize: 15, maxWidth: "95%", alignSelf: "center" }}
              >
                {item.description}
              </CustomText>
            </CustomView>
          </TouchableOpacity>
        </CustomView>
      );
    });
  };

  return (
    <CustomView style={globalStyles.container}>
      <CustomText
        style={{ alignSelf: "flex-start", fontSize: 14, marginTop: 10 }}
      >
        Welcome back, {name ? name : "Engineer"}
      </CustomText>
      <CustomTitle
        style={{ alignSelf: "flex-start", fontSize: 22, marginTop: -5 }}
      >
        Let's Calculate Something!
      </CustomTitle>

      {name ? (
        <CustomView
          style={{
            borderWidth: 1,
            minWidth: "100%",
            borderRadius: 50,
            padding: 20,
            backgroundColor: "rgb(41, 214, 252);",
          }}
        >
          <CustomText style={{ fontSize: 20 }}>
            Your Last Login: {lastLogin}
          </CustomText>
          <CustomText style={{ fontSize: 13 }}>
            Happy to see you back!
          </CustomText>
          <CustomView
            dir="horiz"
            style={{
              justifyContent: "space-evenly",
              backgroundColor: "rgb(41, 214, 252);",
            }}
          >
            {/* <Progress.Bar progress={0.3} width={200} height={10} color="black" /> */}
          </CustomView>
        </CustomView>
      ) : null}

      <CustomView
        style={{
          borderWidth: 1,
          borderColor: colors.text.color,

          minWidth: "100%",
          borderRadius: 50,
          padding: 20,
          marginTop: 10,
        }}
      >
        <CustomText style={{ fontSize: 18 }}>
          Looking for something specific?
        </CustomText>
        <CustomView
          dir="horiz"
          style={{
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={GirlCalcImg}
            style={{
              width: 100,
              height: 100,
              alignSelf: "flex-end",
              borderRadius: 50,
            }}
          />
          <CustomView>
            <CustomInput
              keyboard="default"
              style={{ width: 150 }}
            ></CustomInput>
            <CustomPressable url="/search">
              <CustomText>Search</CustomText>
            </CustomPressable>
          </CustomView>
        </CustomView>
      </CustomView>

      <CustomText style={{ alignSelf: "flex-start" }}>Categories</CustomText>

      <CustomView dir="horiz">
        <CustomView style={categoryView}>
          <CustomPressable
            onPress={() => {
              setCategory("Chemistry");
              setModalVisible(!modalVisible);
            }}
            style={categoryPressable}
          >
            <CustomView>
              <CustomText style={categoryText}>Chemistry</CustomText>
              <Image source={Chemistry} style={categoryImages} />
            </CustomView>
          </CustomPressable>
        </CustomView>

        <CustomView style={categoryView}>
          <CustomPressable
            onPress={() => {
              setCategory("Fluid Mechanics");
              setModalVisible(!modalVisible);
            }}
            style={categoryPressable}
          >
            <CustomView>
              <CustomText style={categoryText}>Fluid Mechanics</CustomText>
              <Image source={Fluids} style={categoryImages} />
            </CustomView>
          </CustomPressable>
        </CustomView>
      </CustomView>

      <CustomView dir="horiz">
        <CustomView style={categoryView}>
          <CustomPressable
            onPress={() => {
              setCategory("Heat Transfer");
              setModalVisible(!modalVisible);
            }}
            style={categoryPressable}
          >
            <CustomView>
              <CustomText style={categoryText}>Heat Transfer</CustomText>
              <Image source={Heat} style={categoryImages} />
            </CustomView>
          </CustomPressable>
        </CustomView>

        <CustomView style={categoryView}>
          <CustomPressable
            onPress={() => {
              setCategory("Physics");
              setModalVisible(!modalVisible);
            }}
            style={categoryPressable}
          >
            <CustomView>
              <CustomText style={categoryText}>Physics</CustomText>
              <Image source={Physics} style={categoryImages} />
            </CustomView>
          </CustomPressable>
        </CustomView>
      </CustomView>

      <CustomText style={{ alignSelf: "flex-start" }}>
        All Calculators
      </CustomText>

      {allCalculators.map((item, i) => {
        return (
          <CustomView
            key={i}
            style={{
              minWidth: "100%",
              borderWidth: 1,
              borderColor: colors.text.color,
              marginTop: 5,
              borderRadius: 25,
            }}
          >
            <TouchableOpacity
              onPress={() => router.navigate(item.link)}
              style={{ minWidth: "100%" }}
            >
              <CustomView
                dir="horiz"
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <CustomText
                  style={{
                    color: "rgb(41, 214, 252);",
                  }}
                >
                  {item.icon}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 20,
                    color: "rgb(41, 214, 252);",
                    fontWeight: "bold",
                    // alignItems: "flex-end",
                    // justifyContent: "center",
                  }}
                >
                  {item.title}
                </CustomText>
              </CustomView>
              <CustomText
                style={{ fontSize: 15, maxWidth: "95%", alignSelf: "center" }}
              >
                {item.slogan}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 13,
                  alignSelf: "flex-end",
                  color: "rgb(41, 214, 252);",
                }}
              >
                Category: {item.category}
              </CustomText>
            </TouchableOpacity>
          </CustomView>
        );
      })}

      <CustomText style={{ alignSelf: "flex-start" }}>
        Tools & Resources
      </CustomText>
      {displayTools()}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CustomView style={{ flex: 1 }}>
          <ScrollView>
            <Category
              category={category}
              updateModal={updateModal}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <CustomPressable
              icon="back"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ alignSelf: "center" }}
            >
              Go Back
            </CustomPressable>
          </ScrollView>
        </CustomView>
      </Modal>
    </CustomView>
  );
}
