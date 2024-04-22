import React, { useEffect, useState } from "react";
import CustomView from "../../components/customView";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomLine from "../../components/customLine";
import CustomPressable from "../../components/customPressable";
import auth from "../../auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import { router, useFocusEffect } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomInput from "../../components/customInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allCalculators from "../../data/allCalculators";
import { useCallback } from "react";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anonUser, setAnonUser] = useState(false);
  const [signupDate, setSignupDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [favorites, setFavorites] = useState([]);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user && user.isAnonymous) {
      setAnonUser(true);
    } else if (user) {
      const uid = user.uid;
      let signDate = new Date(user.metadata.creationTime);
      setSignupDate(signDate.toDateString());
      let lastLog = new Date(user.metadata.lastSignInTime);
      setLastLogin(lastLog.toDateString());
      setAnonUser(false);
    }
  });

  const signOutUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    signOut(auth).then(() => console.log("User signed out!"));

    signInAnonymously(auth)
      .then(() => {
        // console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          // console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
    setAnonUser(true);
  };

  const signIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  async function getData() {
    try {
      let savedFavorites = await AsyncStorage.getItem("_fav");
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.log("error reading data", e);
    }
    displaySavedCalculators();
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const displaySavedCalculators = () => {
    if (favorites.length === 0) {
      return <CustomText>There are no saved calculators.</CustomText>;
    }
    if (favorites) {
      return favorites.map((item, i) => {
        let calc = allCalculators.filter((el) => el.link === `/${item}`);
        calc = calc[0];

        if (calc) {
          return (
            <CustomPressable key={i} url={calc.link}>
              <CustomText>{calc.title}</CustomText>
            </CustomPressable>
          );
        }
      });
    }
  };

  return (
    <CustomView style={{ alignItems: "flex-start" }}>
      <CustomTitle style={{ fontSize: 20 }}>Profile</CustomTitle>

      {!anonUser ? (
        <>
          <CustomText>Name: {auth.currentUser.displayName}</CustomText>
          <CustomText>Email: {auth.currentUser.email}</CustomText>
          <CustomText>Member Since: {signupDate} </CustomText>
          <CustomText>Last Login: {lastLogin} </CustomText>

          <CustomLine />
          <CustomPressable onPress={signOutUser}>Sign out</CustomPressable>
        </>
      ) : (
        <>
          <CustomView
            style={{
              width: "100%",
              alignItems: "stretch",
            }}
          >
            <CustomText>
              You are not currently signed in. Sign in below.
            </CustomText>
            <CustomView dir="horiz">
              <MaterialIcons name="email" size={30} />
              <CustomInput
                placeholder="Email"
                keyboard="default"
                onChangeText={setEmail}
                value={email}
              />
            </CustomView>
            <CustomView dir="horiz">
              <MaterialIcons name="password" size={30} />
              <CustomInput
                placeholder="Password"
                onChangeText={setPassword}
                keyboard="default"
                value={password}
                secureTextEntry={true}
              />
            </CustomView>

            <CustomPressable
              icon="login"
              onPress={signIn}
              style={{ alignSelf: "center" }}
            >
              Log in
            </CustomPressable>
          </CustomView>

          <CustomText>
            Don't have an account?{" "}
            <CustomText
              style={{ fontWeight: "bold" }}
              onPress={() => {
                router.navigate("../signUp");
              }}
            >
              Create one here.
            </CustomText>
          </CustomText>
          <CustomLine />
        </>
      )}

      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle style={{ fontSize: 20 }}>Saved Calculators:</CustomTitle>
        <Ionicons
          name="reload-circle"
          style={{ alignSelf: "flex-end" }}
          onPress={getData}
          size={30}
        />
      </CustomView>
      {displaySavedCalculators()}
    </CustomView>
  );
}
