import { Pressable, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./customText";

const CustomPressable = (props) => {
  const { url, icon, onPress, style, ...rest } = props;

  return (
    <Pressable
      onPress={url ? () => router.navigate(url) : onPress ? onPress : null}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1.0,
        },
        globalStyles.button,
        globalStyles.horizContainer,
        style,
      ]}
      {...rest}
    >
      <AntDesign
        name={icon}
        size={globalStyles.antIcon.size}
        color={globalStyles.antIcon.color}
      />

      <CustomText style={globalStyles.text}>{props.children}</CustomText>
    </Pressable>
  );
};

export default CustomPressable;
