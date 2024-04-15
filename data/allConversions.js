import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

const iconSize = 26;

const allConversions = [
  {
    name: "Length",
    conversions: [
      "1 meter (m) = 100 centimeters (cm)",
      "1 kilometer (km) = 1000 meters (m)",
      "1 inch (in) = 2.54 centimeters (cm)",
      "1 foot (ft) = 12 inches (in)",
      "1 mile (mi) = 5280 feet (ft)",
    ],
    icon: <MaterialCommunityIcons name="ruler" size={iconSize} />,
  },
  {
    name: "Area",
    conversions: [
      "1 square meter (m²) = 10,000 square centimeters (cm²)",
      "1 hectare (ha) = 10,000 square meters (m²)",
      "1 acre = 4046.86 square meters (m²)",
    ],
    icon: <MaterialCommunityIcons name="square-opacity" size={iconSize} />,
  },
  {
    name: "Volume",
    conversions: [
      "1 liter (L) = 1000 cubic centimeters (cm³)",
      "1 cubic meter (m³) = 1000 liters (L)",
      "1 gallon (gal) = 3.78541 liters (L)",
    ],
    icon: <MaterialCommunityIcons name="cup" size={iconSize} />,
  },
  {
    name: "Weight / Mass",
    conversions: [
      "1 kilogram (kg) = 1000 grams (g)",
      "1 metric ton (t) = 1000 kilograms (kg)",
      "1 pound (lb) = 0.453592 kilograms (kg)",
    ],
    icon: <MaterialCommunityIcons name="scale-bathroom" size={iconSize} />,
  },
  {
    name: "Temperature",
    conversions: [
      "Celsius (°C) to Fahrenheit (°F): °F = (°C × 9/5) + 32",
      "Fahrenheit (°F) to Celsius (°C): °C = (°F - 32) × 5 / 9",
      "Celsius (°C) to Kelvin (K): K = °C + 273.15",
    ],
    icon: <MaterialCommunityIcons name="coolant-temperature" size={iconSize} />,
  },
  {
    name: "Speed / Velocity",
    conversions: [
      "1 kilometer per hour (km/h) = 0.621371 miles per hour (mph)",
      "1 meter per second (m/s) = 2.23694 miles per hour (mph)",
    ],
    icon: <MaterialCommunityIcons name="car-speed-limiter" size={iconSize} />,
  },
  {
    name: "Pressure",
    conversions: [
      "1 atmosphere (atm) = 101,325 pascals (Pa)",
      "1 bar = 100,000 pascals (Pa)",
      "1 psi (pound per square inch) = 6894.76 pascals (Pa)",
    ],
    icon: <MaterialCommunityIcons name="gas-cylinder" size={iconSize} />,
  },
  {
    name: "Energy",
    conversions: [
      "1 joule (J) = 0.239006 calories (cal)",
      "1 calorie (cal) = 4.184 joules (J)",
      "1 kilowatt-hour (kWh) = 3600 kilojoules (kJ)",
    ],
    icon: <SimpleLineIcons name="energy" size={iconSize} />,
  },
  {
    name: "Time",
    conversions: [
      "1 minute (min) = 60 seconds (s)",
      "1 hour (h) = 60 minutes (min)",
      "1 day = 24 hours (h)",
    ],
    icon: <MaterialCommunityIcons name="clock-time-four" size={iconSize} />,
  },
  {
    name: "Time",
    conversions: [
      "1 degree (°) = 60 minutes (') = 3600 seconds (\")",
      "1 radian (rad) ≈ 57.2958 degrees (°)",
    ],
    icon: <MaterialCommunityIcons name="angle-acute" size={iconSize} />,
  },
];

export default allConversions;
