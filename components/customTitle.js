import { Text } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";

const CustomTitle = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, ...rest } = props;

  return (
    <Text
      {...rest}
      style={[globalStyles.title, style, { color: colors.title.color }]}
    ></Text>
  );
};

export default CustomTitle;
