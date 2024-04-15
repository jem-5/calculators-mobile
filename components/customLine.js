import { View } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";

const CustomLine = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, ...rest } = props;

  return (
    <View
      style={[globalStyles.line, { borderColor: colors.line.borderColor }]}
    />
  );
};

export default CustomLine;
