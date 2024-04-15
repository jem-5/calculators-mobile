export const massUnitOptions = [
  "milligrams (mg)",
  "grams (g)",
  "kilograms (kg)",
  "ounces (oz)",
  "pounds (lb)",
];

const massUnits = [];
massUnitOptions.forEach((item) => {
  massUnits.push({
    label: item,
    value: item,
  });
});

export default massUnits;

export const speedUnitOptions = [
  "meters per second (m/s)",
  "kilometers per hour (km/h)",
  "feet per second (ft/s)",
  "miles per hour (mph)",
];

export const speedUnits = [];
speedUnitOptions.forEach((item) => {
  speedUnits.push({
    label: item,
    value: item,
  });
});

export const timeUnitOptions = ["seconds (s)", "minutes (min)", "hours (hrs)"];

export const timeUnits = [];
timeUnitOptions.forEach((item) => {
  timeUnits.push({
    label: item,
    value: item,
  });
});

export const distanceUnitOptions = [
  "meters (m)",
  "feet (ft)",
  "miles (mi)",
  "inches (in)",
];

export const distanceUnits = [];
distanceUnitOptions.forEach((item) => {
  distanceUnits.push({
    label: item,
    value: item,
  });
});

export const weightUnitOptions = [
  "pounds (lbs)",
  "kilograms (kg)",
  "grams (g)",
  "ounces (oz)",
];

export const weightUnits = [];
weightUnitOptions.forEach((item) => {
  weightUnits.push({
    label: item,
    value: item,
  });
});

export const flowRateUnitOptions = [
  "US gallons per second (gal/s)",
  "US gallons per minute (gal/min)",
  "cubic feet per second (ft^3/s)",
  "cubic feet per minute (ft^3/min)",
  "cubic meters per second (m^3/s)",
  "cubic meters per minute (m^3/min)",
];

export const flowRateUnits = [];
flowRateUnitOptions.forEach((item) => {
  flowRateUnits.push({
    label: item,
    value: item,
  });
});

const pressureUnitOptions = [
  "pascals (Pa)",
  "pounds per square inch (psi)",
  "standard atmospheres (atm)",
  "inches of mercury (inHg)",
];
export const pressureUnits = [];
pressureUnitOptions.forEach((item) => {
  pressureUnits.push({
    label: item,
    value: item,
  });
});

const volumeUnitOptions = [
  "cubic meters",
  "cubic feet",
  "cubic inches",
  "US gallons",
];

export const volumeUnits = [];
volumeUnitOptions.forEach((item) => {
  volumeUnits.push({
    label: item,
    value: item,
  });
});

const tempUnitOptions = ["Fahrenheit (F)", "Celsius (C)", "Kelvin (K)"];

export const tempUnits = [];
tempUnitOptions.forEach((item) => {
  tempUnits.push({
    label: item,
    value: item,
  });
});

const areaUnitOptions = [
  "square meters (m2)",
  "square centimeters (cm2)",
  "square inches (in2)",
  "square feet (ft2)",
];

export const areaUnits = [];
areaUnitOptions.forEach((item) => {
  areaUnits.push({
    label: item,
    value: item,
  });
});
