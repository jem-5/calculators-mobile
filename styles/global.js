import { StyleSheet } from "react-native";
// import React from "react";

export const globalStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 5,
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "black",
  },

  text: {
    fontSize: 20,
    fontFamily: "Comfortaa_600SemiBold",
  },
  lightThemeText: {
    color: "black",
  },
  darkThemeText: {
    color: "white",
  },

  title: {
    fontSize: 29,
    fontFamily: "Inter_900Black",
    marginTop: 30,
  },
  lightThemeTitle: {
    color: "black",
  },
  darkThemeTitle: {
    color: "white",
  },

  heading: {
    fontSize: 25,
    fontFamily: "Inter_400Regular",
  },
  lightThemeHeading: {
    color: "black",
  },
  darkThemeHeading: {
    color: "white",
  },

  horizContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  line: {
    borderBottomWidth: 2,
    width: "100%",
    margin: 10,
  },
  lightThemeLine: {
    borderColor: "black",
  },
  darkThemeLine: {
    borderColor: "white",
  },

  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 2,
    elevation: 3,
    backgroundColor: "rgb(41, 214, 252);",
    marginVertical: 1,
  },

  input: {
    fontSize: 16,
    borderBottomColor: "gray",
    backgroundColor: "white",
    borderBottomWidth: 0.7,
    height: 43,
    minWidth: "50%",
  },
  lightThemeInput: {
    color: "black",
    backgroundColor: "white",
  },
  darkThemeInput: {
    backgroundColor: "black",
    color: "white",
  },

  picker: {
    inputIOS: {
      fontSize: 20,
      paddingVertical: 6,
      // paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      // color: "black",
      // flex: 2,
      // paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      flexShrink: 2,
      fontSize: 18,
      // paddingVertical: 6,
      // paddingBottom: 5,
      borderBottomWidth: 0.8,
      borderBottomColor: "gray",
      // backgroundColor: "blue",
      // color: "red",
      paddingRight: 20,
    },
  },

  antIcon: {
    size: 25,
    color: "black",
  },

  matIcon: {
    fontSize: 25,
    color: "rgb(41, 214, 252)",
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  equation: {
    fontSize: 22,
    color: "blue",
    fontCache: true,
  },
});
