import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomPressable from "./customPressable";
import CustomView from "./customView";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function CustomFavorite({ name }) {
  const iconSize = 30;
  const [isSaved, setIsSaved] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  async function getData() {
    let savedFavorite = await AsyncStorage.getItem("_fav");
    if (savedFavorite) {
      setFavorites(JSON.parse(savedFavorite));
      if (savedFavorite.includes(name)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }

  const updateStorage = async (value) => {
    await AsyncStorage.setItem("_fav", JSON.stringify(value));
  };

  const toggleSave = () => {
    if (!isSaved) {
      setIsSaved(true);
      let newArr = [...favorites, name];
      setFavorites(newArr);
      updateStorage(newArr);
    } else if (isSaved) {
      setIsSaved(false);
      let newArr = [...favorites].filter((item) => item !== name);
      setFavorites(newArr);
      updateStorage(newArr);
    }
  };

  return (
    <>
      {isSaved ? (
        <Ionicons
          name="heart-sharp"
          size={iconSize}
          style={{ alignSelf: "center" }}
          onPress={toggleSave}
        />
      ) : (
        <Ionicons
          name="heart-outline"
          size={iconSize}
          style={{ alignSelf: "center" }}
          onPress={toggleSave}
        />
      )}
    </>
  );
}
