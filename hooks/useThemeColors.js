import { useColorScheme } from "react-native";
import { globalStyles } from "../styles/global";
const Colors = {
  light: {
    text: globalStyles.lightThemeText,
    container: globalStyles.lightContainer,
    title: globalStyles.lightThemeTitle,
    line: globalStyles.lightThemeLine,
    input: globalStyles.lightThemeInput,
  },
  dark: {
    text: globalStyles.darkThemeText,
    container: globalStyles.darkContainer,
    title: globalStyles.darkThemeTitle,
    line: globalStyles.darkThemeLine,
    input: globalStyles.darkThemeInput,
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
