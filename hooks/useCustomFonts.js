import {
  Inter_400Regular,
  Inter_100Thin,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  Comfortaa_400Regular,
  Comfortaa_600SemiBold,
  Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";

import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";

const useCustomFonts = () => {
  let [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_400Regular,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Inter_900Black,
    BebasNeue_400Regular,

    Comfortaa_600SemiBold,
    JosefinSans_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return fontsLoaded;
};

export default useCustomFonts;
