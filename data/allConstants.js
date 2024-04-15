const allConstants = [
  {
    name: "Planck's Constant (h)",
    value: "6.62607015e-34",
    unit: "J·s",
    description:
      "Fundamental constant in quantum mechanics, relates energy of a photon to its frequency.",
    icon: <></>,
  },
  {
    name: "Speed of Light in Vacuum (c)",
    value: "299792458",
    unit: "m/s",
    description:
      "Universal constant, speed at which light travels in vacuum, crucial in relativity and electromagnetism.",
    icon: <></>,
  },
  {
    name: "Gravitational Constant (G)",
    value: "6.67430e-11",
    unit: "m³kg⁻¹s⁻²",
    description:
      "Determines gravitational attraction between objects, used in Newton's law of universal gravitation.",
    icon: <></>,
  },
  {
    name: "Boltzmann Constant (k)",
    value: "1.380649e-23",
    unit: "J/K",
    description:
      "Relates average kinetic energy of particles in a gas with its temperature, used in statistical mechanics.",
    icon: <></>,
  },
  {
    name: "Permittivity of Free Space (ε₀)",
    value: "8.85418782e-12",
    unit: "F/m",
    description:
      "Defines vacuum's ability to permit electric field lines, used in electromagnetism.",
    icon: <></>,
  },
  {
    name: "Permeability of Free Space (μ₀)",
    value: "1.25663706e-6",
    unit: "N/A²",
    description:
      "Determines vacuum's ability to permit magnetic field lines, crucial in electromagnetism.",
    icon: <></>,
  },
  {
    name: "Elementary Charge (e)",
    value: "1.602176634e-19",
    unit: "C",
    description: "Represents electric charge of a single proton or electron.",
    icon: <></>,
  },
  {
    name: "Fine-Structure Constant (α)",
    value: "7.2973525693e-3",
    unit: "",
    description:
      "Characterizes strength of electromagnetic interaction between charged particles.",
    icon: <></>,
  },
  {
    name: "Avogadro's Number (Nₐ)",
    value: "6.02214076e23",
    unit: "mol⁻¹",
    description:
      "Defines number of particles in one mole of a substance, vital in chemistry and physics.",
    icon: <></>,
  },
  {
    name: "Universal Gas Constant (R)",
    value: "8.314462618",
    unit: "J/(mol·K)",
    description:
      "Relates energy and temperature of an ideal gas, used in thermodynamics and ideal gas law.",
    icon: <></>,
  },
  {
    name: "Planck Length (lₚ)",
    value: "1.616255e-35",
    unit: "m",
    description:
      " Defines scale at which quantum gravitational effects become significant.",
    icon: <></>,
  },
  {
    name: "Planck Time (tₚ)",
    value: "5.39116e-44",
    unit: "s",
    description:
      "Defines smallest possible measurement of time in quantum mechanics and general relativity.",
    icon: <></>,
  },
  {
    name: "Planck Mass (mₚ)",
    value: "2.176434e-8",
    unit: "kg",
    description:
      "Characterizes mass scale at which quantum gravitational effects become significant.",
    icon: <></>,
  },
  {
    name: "Fine-Tuning Parameter (Ω)",
    value: "",
    unit: "",
    description:
      "Dimensionless density parameter in cosmology, determines fate of the universe.",
    icon: <></>,
  },
  {
    name: "Euler's Number (e)",
    value: "2.718281828459045",
    unit: "",
    description:
      "Mathematical constant, base of natural logarithm, used in calculus and exponential growth models.",
    icon: <></>,
  },
  {
    name: "Golden Ratio (φ)",
    value: "1.618033988749895",
    unit: "",
    description: "Mathematical constant found in geometry, art, and nature.",
    icon: <></>,
  },
  {
    name: "Pi (π)",
    value: "3.141592653589793",
    unit: "",
    description:
      "Mathematical constant representing ratio of a circle's circumference to its diameter, used in geometry and trigonometry.",
    icon: <></>,
  },
  {
    name: "Euler-Mascheroni Constant (γ)",
    value: "0.577215664901532",
    unit: "",
    description:
      "Mathematical constant appearing in various areas of mathematics.",
    icon: <></>,
  },
  {
    name: "Coulomb's Constant (kₑ)",
    value: "8.9875517923e9",
    unit: "Nm²/C²",
    description:
      "Determines electrostatic force between charged particles in vacuum, crucial in electrostatics.",
    icon: <></>,
  },
  {
    name: "Magnetic Flux Quantum (Φ₀)",
    value: "2.067833848e-15",
    unit: "Wb",
    description:
      "Defines quantum of magnetic flux, used in superconductivity and quantum mechanics.",
    icon: <></>,
  },
  {
    name: "Reduced Planck Constant (ħ)",
    value: "1.0545718e-34",
    unit: "J·s",
    description: "Represents quantum of angular momentum in quantum mechanics.",
    icon: <></>,
  },
  {
    name: "Stefan-Boltzmann Constant (σ)",
    value: "5.670374419e-8",
    unit: "W/(m²·K⁴)",
    description:
      "Determines power radiated per unit area by a black body in thermal equilibrium.",
    icon: <></>,
  },
  {
    name: "Rydberg Constant (R∞)",
    value: "10973731.568525",
    unit: "m⁻¹",
    description:
      "Determines wavelengths of photons absorbed or emitted during electronic transitions in hydrogen atoms.",
    icon: <></>,
  },
  {
    name: "Faraday Constant (F)",
    value: "96485.33212",
    unit: "C/mol",
    description:
      "Relates amount of electric charge to number of moles of electrons, vital in electrochemistry.",
    icon: <></>,
  },
  {
    name: "Electron Rest Mass (mₑ)",
    value: "9.10938356e-31",
    unit: "kg ",
    description: "Represents mass of an electron at rest.",
    icon: <></>,
  },
  {
    name: "Neutron Rest Mass (mₙ)",
    value: "1.674927471e-27",
    unit: "kg",
    description: "Represents mass of a neutron at rest.",
    icon: <></>,
  },
  {
    name: "Proton Rest Mass (mₚ)",
    value: "1.67262192369e-27",
    unit: "kg",
    description: " Represents mass of a proton at rest.",
    icon: <></>,
  },
  {
    name: "Wien Displacement Law Constant (b)",
    value: "2.897771955e-3",
    unit: "m·K",
    description:
      "Relates peak wavelength of radiation emitted by a black body to its temperature.",
    icon: <></>,
  },
  {
    name: "Quantum of Action (ħ)",
    value: "1.0545718e-34",
    unit: "J·s",
    description:
      "Represents minimum amount of action that can be added to a system in quantum mechanics.",
    icon: <></>,
  },
];

export default allConstants;
