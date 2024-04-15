import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const iconSize = 22;

const allCalculators = [
  {
    title: "Molar Mass",
    photo: {},
    link: "/molarMass",
    paragraph:
      "Molar mass is a fundamental concept in chemistry that plays a crucia rolle in various chemical calculations and is essential for understanding the behavior of substances on a molecular level. Molar mass is defined as the mass of one mole of a substance and is expressed in units of grams per mole (g/mol). This quantity represents the average mass of all the atoms or molecules in a sample, taking into account their relative abundances.",
    slogan: "Molar Mass: where atoms gather for their collective weigh-in!",
    category: "Chemistry",
    icon: <MaterialCommunityIcons size={iconSize} name={"scale"} />,
  },
  {
    title: "Friction Loss",
    photo: {},
    link: "/frictionLoss",
    paragraph:
      "Calculating friction loss in a pipe is a critical aspect of fluid mechanics, particularly in engineering applications such as   plumbing, HVAC (heating, ventilation, and air conditioning) systems, and the design of pipelines. Friction loss refers to the loss of pressure in a fluid as it flows through a pipe due to the resistance encountered against the pipe walls. Several factors influence friction loss, including pipe roughness, diameter, length, and volumetric flow rate.",
    slogan:
      "Don't let friction pipe down your flow! Where did all that pressure go?",
    category: "Fluid Mechanics",
    icon: <MaterialCommunityIcons size={iconSize} name={"pipe-valve"} />,
  },
  {
    title: "Planet Weights",
    photo: {},
    link: "/planetWeights",
    paragraph:
      "      Determining someone's weight on different planets involves understanding the concept of gravitational force and how it varies across celestial bodies. On Earth, weight is the measure of the gravitational force exerted by the planet on an object. This force is directly proportional to the object's mass and inversely proportional to the square of the distance between the object's center of mass and the center of the planet.",
    slogan:
      "Gravity's the ultimate scale shifter! Let's take a trip to Mars, shall we?",
    category: "Physics",
    icon: <Ionicons size={iconSize} name={"planet"} />,
  },
  {
    title: "Atomic Mass",
    photo: {},
    link: "/atomicMass",
    paragraph:
      "Average atomic mass, also known as atomic weight, is a concept in chemistry that accounts for the presence of isotopes in the calculation of the mass of an element. Isotopes are atoms of the same element that have different numbers of neutrons, resulting in variations in atomic mass. The average atomic mass considers both the mass and the abundance of each isotope to provide a weighted average that reflects the distribution of isotopes in a naturally occurring sample.",
    slogan:
      "Let's explore how isotopes compete for the 'weightiest' title in the atomic Olympics!",
    category: "Chemistry",
    icon: <MaterialCommunityIcons size={iconSize} name={"periodic-table"} />,
  },
  {
    title: "Beverage Cooling",
    photo: {},
    link: "/beverageCooling",
    paragraph:
      "The time it takes for a hot drink to reach equilibrium, or cool off, is influenced by various factors such as the initial temperature of the drink, the ambient temperature, the vessel it's in, and the heat capacity of the liquid inside. The process of cooling follows principles of heat transfer and thermodynamics, and one can use Newton's Law of Cooling to model this phenomenon.",
    slogan:
      "Caffeine Cooling Chronicles: where patience is brewed one sip at a time!",
    category: "Heat Transfer",
    icon: <MaterialIcons size={iconSize} name={"emoji-food-beverage"} />,
  },
  {
    title: "Conductive Transfer",
    photo: {},
    link: "/conductiveTransfer",
    paragraph:
      "Conductive heat transfer is a fundamental mode of heat transfer that occurs when thermal energy flows through a solid material due to the direct interaction of neighboring atoms and molecules. In solids, heat is transferred through the vibration and collision of atoms within the lattice structure. The efficiency of this process depends on the material's thermal conductivity, which is a property defining its ability to conduct heat.",
    slogan:
      "Heat Conduction: where molecules pass the hot potato faster than you can say 'ouch!'",
    category: "Heat Transfer",
    icon: <MaterialIcons size={iconSize} name={"heat-pump"} />,
  },
  {
    title: "Electron Configuration",
    photo: {},
    link: "/electronConfiguration",
    paragraph:
      "Electron configuration is a representation of how electrons are distributed among the energy levels, or shells, in an atom. It describes the specific arrangement of electrons in an atom, detailing which energy levels contain electrons and how many electrons are in each level. The electron configuration is crucial for understanding the chemical behavior and properties of  elements.",
    slogan:
      "Electron Configuration: unraveling atomic secrets, one electron dance party at a time!",
    category: "Chemistry",
    icon: <Ionicons size={iconSize} name={"logo-electron"} />,
  },
  {
    title: "Electronegativity",
    photo: {},
    link: "/electronegativity",
    paragraph:
      "Electronegativity is a fundamental property of elements that measures their ability to attract electrons in a chemical bond. It plays a crucial role in predicting the type of bond that forms between two elements in a compound. The electronegativity values, usually assigned based on the Pauling scale, range from 0.7 for cesium to 4.0 for fluorine. The larger the electronegativity difference between two elements, the more polar the bond, and the more likely an ionic or polar covalent bond will form.",
    slogan:
      "Bonding Bingo: where electronegativity sparks relationships that make or break!",
    category: "Chemistry",
    icon: <SimpleLineIcons size={iconSize} name={"chemistry"} />,
  },
  {
    title: "Free Fall",
    photo: {},
    link: "/freeFall",
    paragraph:
      "  In the context of free fall, an object is falling under the influence of gravity with no other forces acting on it except for gravity. The motion of an object in free fall can be described using several kinematic equations that relate its position, velocity, time, and acceleration. Three key parameters often of         interest are time, speed, and height, and they can be calculated using these equations.",
    slogan:
      "Wheee! Free Fall Follies: where gravity plays the ultimate game of 'What Goes Up Must Come Down!'",
    category: "Physics",
    icon: <MaterialIcons size={iconSize} name={"sports-volleyball"} />,
  },

  {
    title: "Heat Capacity",
    photo: {},
    link: "/heatCapacity",
    paragraph:
      "Heat capacity is a fundamental thermodynamic property that quantifies the amount of heat energy required to raise the temperature of a substance by a certain amount. The heat capacity of a material can be calculated based on its mass and the specific heat of the material.",
    slogan:
      "Heat Capacity: turning up the heat on materials until they spill the beans on their thermal secrets!",
    category: "Heat Transfer",
    icon: <MaterialIcons size={iconSize} name={"heat-pump"} />,
  },
  {
    title: "Hydraulic Radius",
    photo: {},
    link: "/hydraulicRadius",
    paragraph:
      "      The hydraulic radius is a crucial parameter in fluid mechanics that characterizes the efficiency of a pipe or channel in transporting water. It is defined as the ratio of the cross-sectional area of the flow to the wetted perimeter. The hydraulic radius is a key factor in determining the frictional losses and the velocity distribution of flowing water.",
    slogan:
      "Hydraulic Radius: where pipes reveal their inner curves because even water wants to know its flow status!",
    category: "Fluid Mechanics",
    icon: <MaterialCommunityIcons size={iconSize} name={"pipe"} />,
  },
  {
    title: "Ideal Gas",
    photo: {},
    link: "/idealGas",
    paragraph:
      " Performing an ideal gas analysis involves using the ideal gas law, which describes the behavior of an ideal gas under various  conditions. ",
    slogan:
      "Ideal Gases: where gases aspire to be textbook perfect, but reality gives them a dose of comedic relief!",
    category: "Heat Transfer",
    icon: <MaterialCommunityIcons size={iconSize} name={"air-filter"} />,
  },
  {
    title: "Momentum",
    photo: {},
    link: "/momentum",
    paragraph:
      "The linear conservation of momentum is a fundamental principle in classical mechanics that states that the total linear momentum of an isolated system remains constant if no external forces act on it. Linear momentum is the product of an object's mass and its velocity and is a vector quantity, meaning it has both magnitude and direction. ",
    slogan:
      "All this momentum ain't gonna disappear! Let's keep the physics straight in a world full of unexpected curves!",
    category: "Physics",
    icon: <Ionicons size={iconSize} name={"speedometer"} />,
  },
  {
    title: "Orifice Flow",
    photo: {},
    link: "/orificeFlow",
    paragraph:
      " Calculating orifice flow discharge is a fundamental aspect of fluid mechanics and is commonly employed in various engineering applications, such as in the design of hydraulic systems, flow measurement devices, and water distribution systems. The orifice equation is used to estimate the flow rate through an orifice based on the head of water, the diameter of the orifice, and the discharge coefficient.",
    slogan:
      "Fluid Flow Funneling: where liquids take the plunge, leaving chaos in their wake!",
    category: "Fluid Mechanics",
    icon: <Ionicons size={iconSize} name={"water"} />,
  },
  {
    title: "Percent Composition",
    photo: {},
    link: "/percentComposition",
    paragraph:
      "The percent composition by mass of a molecule is a fundamental concept in chemistry that provides insights into the relative abundance of elements within a compound. It is defined as the percentage of the total mass of a compound that comes from each individual element present in that compound. The percent composition is a critical factor in understanding and characterizing chemical compounds, as it helps elucidate their properties and behaviors.",
    slogan:
      "What's in a molecule anyway? Exploring the distribution of elements in a molecule.",
    category: "Chemistry",
    icon: <MaterialCommunityIcons size={iconSize} name={"atom"} />,
  },
  {
    title: "Pipe Flow",
    photo: {},
    link: "/pipeFlow",
    paragraph:
      "Calculating pipe flow velocity and volumetric flow rate is crucial in fluid mechanics and engineering, especially when designing piping systems or analyzing fluid transport. The flow velocity and volumetric flow rate are interrelated parameters that provide insights into the dynamics of fluid movement within pipes.",
    slogan: "Whoosh! Let's explore fluid movement through pipes.",
    category: "Fluid Mechanics",
    icon: <MaterialCommunityIcons size={iconSize} name={"pipe-leak"} />,
  },

  {
    title: "Projectile",
    photo: {},
    link: "/projectile",
    paragraph:
      "Projectile motion is a fascinating aspect of classical mechanics that describes the motion of an object thrown into the air, experiencing only the force of gravity and air resistance (if present). This type of motion is characterized by the object following a curved trajectory under the influence of a constant gravitational acceleration. The physics of projectile motion can be analyzed using principles from kinematics and vector analysis.",
    slogan:
      "Projectile Physics! Sometimes, the laws of gravity just want to see things fly!",
    category: "Physics",
    icon: <Ionicons size={iconSize} name={"tennisball"} />,
  },
  {
    title: "Stopping Distance",
    photo: {},
    link: "/stoppingDistance",
    paragraph:
      "The stopping distance of a vehicle is a crucial factor in road safety and is influenced by various parameters, including speed, road conditions (wet or dry), driver reaction time, and road grade or slope. Understanding how these factors interact is essential for designing roadways, establishing speed limits, and promoting safe driving practices.",
    slogan:
      "Stopping Distance Saga: where speed demons meet their match in a battle of brakes and brainpower!",
    category: "Physics",
    icon: <Ionicons size={iconSize} name={"car"} />,
  },
  {
    title: "Thermal Resistance",
    photo: {},
    link: "/thermalResistance",
    paragraph:
      " Thermal resistance and thermal conductivity are crucial concepts in understanding heat transfer processes in materials. Thermal   resistance is a measure of how much a material impedes the flow of heat. It is analogous to electrical resistance in that it represents the opposition to the flow of thermal energy. Thermal resistance is influenced by factors such as material thickness, cross-sectional area, and the thermal conductivity of the  material.",
    slogan: "Thermal Resistance: Even heat has its social boundaries!",
    category: "Heat Transfer",
    icon: <MaterialCommunityIcons size={iconSize} name={"thermometer-alert"} />,
  },
  {
    title: "Wind Load",
    photo: {},
    link: "/windLoad",
    paragraph:
      " Calculating wind load is a critical aspect of structural engineering, especially when designing buildings, bridges, or other structures exposed to wind forces. Wind load is the force exerted by the wind on a structure, and it is influenced by factors such as wind speed, angle of incidence, and the surface area of the object facing the wind. Understanding and accurately calculating wind loads are essential for ensuring the safety and stability of structures under various wind conditions.",
    slogan:
      "Wow, it's pretty windy today! Let's explore nature's gentle reminder that even buildings need a good hair day!",
    category: "Fluid Mechanics",
    icon: <MaterialCommunityIcons size={iconSize} name={"weather-windy"} />,
  },
];
export default allCalculators;
