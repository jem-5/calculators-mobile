import { View } from "react-native";
import { globalStyles } from "../styles/global";
import useThemeColors from "../hooks/useThemeColors";
import useCustomFonts from "../hooks/useCustomFonts";
import { ScrollView } from "react-native";

const CustomView = (props) => {
  const colors = useThemeColors();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  const { style, dir, ...rest } = props;

  if (dir === "horiz") {
    return (
      <View
        style={[
          globalStyles.horizContainer,
          {
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
          },
          { backgroundColor: colors.container.backgroundColor },
          style,
        ]}
        {...rest}
      >
        {props.children}
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View
          style={[
            globalStyles.container,

            {
              backgroundColor: colors.container.backgroundColor,
            },
            style,

            ,
          ]}
          {...rest}
        >
          {props.children}
        </View>
      </ScrollView>
    );
  }
};

export default CustomView;
