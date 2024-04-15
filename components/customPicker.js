import { Text } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";

const CustomPicker = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, ...rest } = props;

  return (
    <RNPickerSelect
      style={{
        inputAndroid: {
          backgroundColor: colors.container.backgroundColor,
          color: colors.input.color,
          ...globalStyles.picker.inputAndroid,
          height: 23,
        },
      }}
      {...rest}
      Icon={() => {
        return (
          <MaterialIcons
            name="arrow-drop-down"
            size={23}
            color={colors.input.color}
          />
        );
      }}
    />
  );
};

export default CustomPicker;
