// here unit is what is supplied for input. output in m/s
export const convertFromSpeed = (speed, unit) => {
  if (unit === "kilometers per hour (km/h)") {
    return speed / 3.6;
  } else if (unit === "feet per second (ft/s)") {
    return speed / 3.281;
  } else if (unit === "miles per hour (mph)") {
    return speed / 2.237;
  } else if (unit === "meters per second (m/s)") {
    return speed;
  }
};
// here unit is what is supplied for output. input in m/s
export const convertToSpeed = (speed, unit) => {
  if (unit === "kilometers per hour (km/h)") {
    return speed * 3.6;
  } else if (unit === "feet per second (ft/s)") {
    return speed * 3.281;
  } else if (unit === "meters per second (m/s)") {
    return speed;
  }
};

// here unit is what is supplied for input. output in kg
export const convertFromMass = (mass, unit) => {
  if (unit === "grams (g)") {
    return mass / 1000;
  } else if (unit === "milligrams (mg)") {
    return mass / 1000000;
  } else if (unit === "ounces (oz)") {
    return mass / 35.274;
  } else if (unit === "pounds (lb)") {
    return mass / 2.205;
  } else if (unit === "kilograms (kg)") {
    return mass;
  }
};

// here unit is what is supplied for input. output in lbs
export const convertMassToLbs = (mass, unit) => {
  if (unit === "grams (g)") {
    return mass / 453.6;
  } else if (unit === "milligrams (mg)") {
    return mass / 453600;
  } else if (unit === "ounces (oz)") {
    return mass / 16;
  } else if (unit === "pounds (lb)") {
    return mass;
  } else if (unit === "kilograms (kg)") {
    return mass * 2.205;
  }
};

// here unit is what is supplied for input. input in kg
export const convertToMass = (mass, unit) => {
  if (unit === "grams (g)") {
    return mass * 1000;
  } else if (unit === "milligrams (mg)") {
    return mass * 1000000;
  } else if (unit === "ounces (oz)") {
    return mass * 35.274;
  } else if (unit === "pounds (lb)") {
    return mass * 2.205;
  } else if (unit === "kilograms (kg)") {
    return mass;
  }
};

// here unit is what is supplied for input. output in sec
export const convertFromTime = (time, unit) => {
  if (unit === "minutes (min)") {
    return time * 60;
  } else if (unit === "hours (hr)") {
    return time * 3600;
  }
  return time;
};

// here unit is what is supplied for output. input in sec
export const convertToTime = (time, unit) => {
  if (unit === "minutes (min)") {
    return time / 60;
  } else if (unit === "hours (hr)") {
    return time / 3600;
  }
  return time;
};

// here unit is what is supplied for input. output in meters
export const convertFromDistance = (dist, unit) => {
  if (unit === "feet (ft)") {
    return dist / 3.281;
  } else if (unit === "miles (mi)") {
    return dist * 1609;
  } else if (unit === "inches (in)") {
    return dist / 39.37;
  }
  return dist;
};

// here unit is what is supplied for output. input in meters
export const convertToDistance = (dist, unit) => {
  if (unit === "feet (ft)") {
    return dist * 3.281;
  } else if (unit === "inches (in)") {
    return dist * 39.37;
  } else if (unit === "miles (mi)") {
    return dist / 1609;
  }
  return dist;
};

// here weight is in lbs, unit is output unit
export const convertWeight = (weight, unit) => {
  if (unit === "kilograms (kg)") {
    return weight * 2.205;
  } else if (unit === "grams (g)") {
    return weight / 453.592;
  } else if (unit === "ounces (oz)") {
    return weight / 16;
  }
  return weight;
};

// input in the unit provided.  output in m/s
export const convertFlowRate = (flow, unit) => {
  if (unit === "US gallons per second (gal/s)") {
    return flow / 264.2;
  } else if (unit === "US gallons per minute (gal/min)") {
    return flow / 15850;
  } else if (unit === "cubic feet per second (ft^3/s)") {
    return flow / 35.315;
  } else if (unit === "cubic feet per minute (ft^3/min)") {
    return flow / 2119;
  } else if (unit === "cubic meters per minute (m^3/min)") {
    return flow / 60;
  }
  return flow;
};

export const convertAngle = (angle, unit) => {
  if (unit === "degrees") {
    return (+angle * 3.14) / 180;
  }
  return angle;
};

export const convertArea = (area, unit) => {
  if (unit === "square feet (ft2)") {
    return area / 10.764;
  } else if (unit === "square inches (in2)") {
    return area / 1550;
  } else if (unit === "square centimeters (cm2)") {
    return area / 10000;
  }
  return area;
};

export const convertPressure = (p, unit) => {
  if (unit === "pounds per square inch (psi)") {
    return p * 6895;
  } else if (unit === "standard atmospheres (atm)") {
    return p * 101300;
  } else if (unit === "inches of mercury (inHg)") {
    return p * 3386;
  }
  return p;
};

export const convertVol = (v, unit) => {
  if (unit === "cubic feet") {
    return v / 35.315;
  } else if (unit === "cubic inches") {
    return v / 61020;
  } else if (unit === "US gallons") {
    return v / 264.2;
  }
  return v;
};

// output in K
export const convertTemp = (t, unit) => {
  if (unit === "Fahrenheit (F)") {
    return (+5 / 9) * (t - 32) + 273;
  } else if (unit === "Celsius (C)") {
    return +t + 273;
  }
  return t;
};

// output in C
export const convertTempToC = (t, unit) => {
  if (unit === "Fahrenheit (F)") {
    return (t - 30) * 0.5;
  } else if (unit === "Kelvin (K)") {
    return +t - 273;
  }
  return t;
};
