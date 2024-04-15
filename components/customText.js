import { Text } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";

const CustomText = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, ...rest } = props;
  if (style !== undefined) {
    return (
      <Text
        {...rest}
        style={[
          globalStyles.text,
          { color: colors.text.color, textAlign: "center" },
          style,
        ]}
      ></Text>
    );
  } else {
    return (
      <Text
        {...rest}
        style={[, globalStyles.text, { color: colors.text.color }]}
      ></Text>
    );
  }
};

export default CustomText;
