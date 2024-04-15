import { MaterialIcons } from "@expo/vector-icons";
import { Slot, Stack, Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false,
          title:"Dashboard",  tabBarIcon: () => <MaterialIcons size={25} name="home" />  }} />
      <Tabs.Screen name="search" options={{  headerShown: false,
          title:"Search",  tabBarIcon: () => <MaterialIcons size={25} name="search" /> }}  />
      <Tabs.Screen name="profile" options={{ headerShown: false,
          title:"Profile",  tabBarIcon: () => <MaterialIcons size={25}name="account-circle" /> }} />
      <Tabs.Screen name="molarMass" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="atomicMass" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="electronegativity" options={{ href: null , headerShown: false }}  />

      <Tabs.Screen name="electronConfiguration" options={{ href: null , headerShown: false }}  />

      <Tabs.Screen name="percentComposition" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="momentum" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="freeFall" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="planetWeights" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="stoppingDistance" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="projectile" options={{ href: null , headerShown: false }}  />

      <Tabs.Screen name="frictionLoss" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="hydraulicRadius" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="pipeFlow" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="windLoad" options={{ href: null , headerShown: false }}  />

      <Tabs.Screen name="orificeFlow" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="heatCapacity" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="idealGas" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="thermalResistance" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="beverageCooling" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="conductiveTransfer" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="category" options={{ href: null , headerShown: false }}  />

      <Tabs.Screen name="constants" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="conversions" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="greekLetters" options={{ href: null , headerShown: false }}  />
      <Tabs.Screen name="equations" options={{ href: null , headerShown: false }}  />

    </Tabs>
  
  </SafeAreaProvider>

  );
}