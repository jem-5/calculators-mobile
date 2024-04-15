import { Text } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";
// import { TextInput } from "react-native";
import { TextInput } from "react-native-paper";
import CustomText from "./customText";
import CustomView from "./customView";

const CustomInput = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, keyboard, placeholder, ...rest } = props;

  return (
    <TextInput
      keyboardType={keyboard || "numeric"}
      mode="outlined"
      textAlignVertical="bottom"
      textAlign="center"
      label={placeholder}
      {...rest}
      style={[
        globalStyles.input,
        style,
        {
          flexGrow: 1,
          backgroundColor: colors.input.backgroundColor,
        },
      ]}
      theme={{
        colors: {
          onSurfaceVariant: colors.input.color,
        },
      }}
      textColor={colors.input.color}
    ></TextInput>
  );
};

export default CustomInput;
