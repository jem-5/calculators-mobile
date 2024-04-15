import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import { globalStyles } from "../styles/global";
const allEquations = [
  {
    name: "Newton's Second Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${F} = {m \\cdot a}$"}
      </MathJaxSvg>
    ),
    assumptions: "Assumes constant mass and neglects relativistic effects.",
    application:
      "Describes the relationship between force, mass and acceleration.",
    usage:
      "Used extensively in mechanics to solve problems related to dynamics and motion.",
  },
  {
    name: "Ohm's Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${V} = {I \\cdot R}$"}
      </MathJaxSvg>
    ),
    assumptions: "Assumes constant resistance.",
    application:
      "Relates voltage, current and resistance in an electrical circuit.",
    usage:
      "Essential in electrical engineering for analyzing and designing circuits.",
  },
  {
    name: "Euler's Identity",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${e^{i\\pi} +1} = {0}$"}
      </MathJaxSvg>
    ),
    assumptions: "None, it's a mathematical identity.",
    application:
      "Demonstrates the relationship between the exponential function, imaginary unit, and trigonometric functions.",
    usage:
      "Widely regarded as one of the most elegant equations in mathematics, with applications in various fields including signal processing and quantum mechanics.",
  },
  {
    name: "Pythagorean Theorem",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${a^2 + b^2} = {c^2}$"}
      </MathJaxSvg>
    ),
    assumptions: "Applicable to right-angled triangles.",
    application: "Relates the lengths of the sides of a right triangle.",
    usage:
      "Fundamental in geometry and trigonometry, used to solve problems involving distances and angles.",
  },
  {
    name: "Second Law of Thermodynamics",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${\\Delta S} \\ge {0}$"}
      </MathJaxSvg>
    ),
    assumptions: "None, it's a fundamental law of nature.",
    application:
      "States that the entropy of an isolated system always increases or remains constant over time.",
    usage:
      "Essential in thermodynamics for analyzing processes such as heat engines and refrigerators.",
  },
  {
    name: "Gauss's Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${\\oint_S E \\cdot dA} = {Q_{enc} \\over \\epsilon_0}$"}
      </MathJaxSvg>
    ),
    assumptions:
      "Applies to electric fields and charge distributions with symmetry.",
    application:
      "Relates the electric flux through a closed surface to the charge enclosed by the surface.",
    usage:
      "Essential in electrostatics for calculating electric fields produced by charge distributions.",
  },
  {
    name: "Hooke's Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${F} = {k \\cdot x}$"}
      </MathJaxSvg>
    ),
    assumptions: "Applies to linear elastic materials.",
    application:
      "Describes the relationship between force applied to a spring, its displacement and the spring constant.",
    usage:
      "Used in mechanics and materials science to analyze the behavior of springs and elastic materials.",
  },
  {
    name: "Schrodinger Equation",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {
          "${i \\hbar} { \\delta \\over {\\delta t} } {\\Psi} = {\\hat{H} \\Psi}$"
        }
      </MathJaxSvg>
    ),
    assumptions: "Applies to quantum systems.",
    application: "Describes the evolution of quantum states over time.",
    usage:
      "Fundamental in quantum mechanics for predicting the behavior of quantum systems such as atoms and molecules.",
  },
  {
    name: "Navier-Stokes Equation",
    equation: (
      <MathJaxSvg color={globalStyles.equation.color} fontSize={20}>
        {
          "${\\rho ( {\\delta v \\over \\delta t} + v \\cdot \\triangledown v)}={-\\triangledown p+\\mu \\triangledown^2 v+f}$"
        }
      </MathJaxSvg>
    ),
    assumptions: "Applies to viscous fluid flow.",
    application: "Describes the motion of fluid substances.",
    usage:
      "Essential in fluid mechanics for analyzing fluid flow phenomena in engineering and physics.",
  },
  {
    name: "Maxwell's Equations",
    equation: (
      <>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {"${\\triangledown \\cdot E} = {\\rho \\over {\\epsilon_0} }$"}
        </MathJaxSvg>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {"${\\triangledown \\cdot B} = {0}$"}
        </MathJaxSvg>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {"${\\triangledown \\times E} = -{ {\\delta B} \\over {\\delta t}}$"}
        </MathJaxSvg>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {
            "${\\triangledown \\times B} = -{\\mu_0 J + \\mu_0 \\epsilon_0 {\\delta E \\over \\delta t}}$"
          }
        </MathJaxSvg>
      </>
    ),
    assumptions: "Describes electromagnetic phenomena in vacuum.",
    application:
      "Describe the behavior of electric and magnetic fields in space.",
    usage:
      "Essential in electromagnetism for analyzing electromagnetic waves, propagation, and interaction with matter.",
  },
  {
    name: "Einstein's Mass-Energy Equivalence",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${E} = {mc^2}$"}
      </MathJaxSvg>
    ),
    assumptions: "Relativistic effects are considered.",
    application: "Describes the equivalence of mass and energy.",
    usage:
      "Fundamental in nuclear physics and cosmology, explaining phenomena like nuclear reactions and the energy release from stars.",
  },
  {
    name: "Coulomb's Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${F} = {k_e {{q_1 q_2} \\over r^2}}$"}
      </MathJaxSvg>
    ),
    assumptions: "Describes electrostatic interactions between point charges.",
    application: "Determines the force between two charged particles.",
    usage:
      "Essential in electrostatics for calculating electric forces and fields.",
  },
  {
    name: "Bayes' Theorem",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${P(A|B)} = {P(B|A)P(A) \\over P(B)}$"}
      </MathJaxSvg>
    ),
    assumptions: "Applicable to probabilistic events.",
    application: "Relates conditional probabilities of events.",
    usage:
      "Widely used in statistics, machine learning, and Bayesian inference.",
  },
  {
    name: "Ideal Gas Law",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${PV} = {nRT}$"}
      </MathJaxSvg>
    ),
    assumptions: "Describes behavior of ideal gases under typical conditions.",
    application:
      "Relates pressure, volume, temperature, and the number of moles of a gas.",
    usage:
      "Fundamental in thermodynamics and engineering for analyzing gas behavior.",
  },
  {
    name: "Fourier Transform",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${F(k)} = {\\int_{-\\infty}^\\infty f(x) e^{- 2 \\pi i k x} dx}$"}
      </MathJaxSvg>
    ),
    assumptions:
      "Transforms functions from time (or spatial) domain to frequency domain.",
    application:
      "Analyzes signals or functions in terms of their frequency components.",
    usage:
      "Essential in signal processing, image processing, and various engineering applications.",
  },
  {
    name: "Sine and Cosine Laws",
    equation: (
      <>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {"${sin(A) \\over a} = {sin(B) \\over b} = {sin(C) \\over c}$"}
        </MathJaxSvg>
        <MathJaxSvg
          color={globalStyles.equation.color}
          fontSize={globalStyles.equation.fontSize}
        >
          {"${c^2} = {a^2 + b^2 - 2ab \\cos(C)}$"}
        </MathJaxSvg>
      </>
    ),
    assumptions: "Applies to triangles.",
    application: "Determine side lengths and angle measures in triangles.",
    usage:
      "Fundamental in trigonometry and geometry for solving problems involving triangles.",
  },
  {
    name: "Bernoulli's Equation",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${P + {1 \\over 2} \\rho v^2 + \\rho g h = constant}$"}
      </MathJaxSvg>
    ),
    assumptions: "Describes steady, incompressible flow along a streamline.",
    application: "Relates pressure, velocity, and height in fluid flow.",
    usage:
      "Essential in fluid mechanics for analyzing flow in pipes, channels, and airfoils.",
  },
  {
    name: "Heisenberg Uncertainty Principle",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${\\Delta x \\Delta p} \\geq {\\hbar \\over 2}$"}
      </MathJaxSvg>
    ),
    assumptions: "Applies to quantum systems.",
    application:
      "Describes the trade-off between the precision of position and momentum measurements.",
    usage:
      "Fundamental in quantum mechanics for understanding the limits of simultaneous measurement of certain pairs of observables.",
  },
  {
    name: "Kirchhoff's Voltage Law (KVL)",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {"${\\sum V = 0}$"}
      </MathJaxSvg>
    ),
    assumptions: "Describes conservation of energy in electrical circuits.",
    application:
      "States that the algebraic sum of voltages in a closed loop of a circuit is zero.",
    usage: "Essential in circuit analysis for solving electrical networks.",
  },
  {
    name: "Maxwell-Boltzmann Distribution",
    equation: (
      <MathJaxSvg
        color={globalStyles.equation.color}
        fontSize={globalStyles.equation.fontSize}
      >
        {
          "${f(v)} = {4 \\pi} {m \\over {2 \\pi k T}}^{3/2} v^2 e^{-mv^2 \\over 2kT}$"
        }
      </MathJaxSvg>
    ),
    assumptions:
      "Describes distribution of velocities of particles in an ideal gas.",
    application:
      "Describes the probability of finding particles with a given velocity.",
    usage:
      "Essential in statistical mechanics for analyzing gas behavior and understanding phenomena like diffusion and effusion.",
  },
];

export default allEquations;
