import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import CustomPicker from "../../components/customPicker";
import CustomTitle from "../../components/customTitle";
import CustomText from "../../components/customText";
import CustomView from "../../components/customView";
import CustomInput from "../../components/customInput";
import { Image, Modal, ScrollView, View, Text } from "react-native";
import CustomPressable from "../../components/customPressable";
import { distanceUnits } from "../../utils/units";
import { convertFromDistance } from "../../utils/conversions";

import TriangularDiagram from "../../assets/images/triangular.png";
import RectangularDiagram from "../../assets/images/rectangular.png";
import CircularDiagram from "../../assets/images/circular.png";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import CustomFavorite from "../../components/customFavorite";

export default function HydraulicRadius() {
  const shapes = ["rectangular", "circular", "triangular"];
  const [shape, setShape] = useState("rectangular");
  const [img, setImg] = useState(null);
  const [height, setHeight] = useState("5");
  const [heightUnit, setHeightUnit] = useState("meters (m)");
  const [width, setWidth] = useState("5");
  const [widthUnit, setWidthUnit] = useState("meters (m)");
  const [radius, setRadius] = useState("5");
  const [radiusUnit, setRadiusUnit] = useState("meters (m)");

  const [area, setArea] = useState(0);
  const [wettedPerimeter, setWettedPerimeter] = useState(0);
  const [hydRad, setHydRad] = useState(0);

  const [calcDone, setCalcDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (shape === "rectangular") {
      const convertedHeight = convertFromDistance(height, heightUnit);
      const convertedWidth = convertFromDistance(width, widthUnit);
      setArea(convertedHeight * convertedWidth);
      setWettedPerimeter(+convertedWidth + 2 * +convertedHeight);
      setHydRad(area / wettedPerimeter);
    } else if (shape === "circular") {
      const convertedRadius = parseFloat(
        convertFromDistance(radius, radiusUnit)
      );
      setArea(3.14 * convertedRadius ** 2);
      setWettedPerimeter(2 * 3.14 * convertedRadius);
      setHydRad(area / wettedPerimeter);
    } else if (shape === "triangular") {
      const convertedHeight = convertFromDistance(height, heightUnit);
      const convertedWidth = convertFromDistance(width, widthUnit);
      setArea((convertedHeight * convertedWidth) / 2);
      const slope = area / convertedHeight ** 2;
      setWettedPerimeter(2 * convertedHeight * Math.sqrt(1 + slope ** 2));
      setHydRad(area / wettedPerimeter);
    }
  }, [
    shape,
    height,
    heightUnit,
    width,
    widthUnit,
    area,
    wettedPerimeter,
    radius,
    radiusUnit,
  ]);

  useEffect(() => {
    if (shape === "triangular") {
      setImg(TriangularDiagram);
    } else if (shape === "rectangular") {
      setImg(RectangularDiagram);
    } else if (shape === "circular") {
      setImg(CircularDiagram);
    }
  });

  return (
    <CustomView>
      <CustomView dir="horiz" style={{ justifyContent: "space-between" }}>
        <CustomTitle>Hydraulic Radius</CustomTitle>
        <CustomFavorite name="hydraulicRadius" />
      </CustomView>
      <CustomText>
        Calculate the hydraulic radius for different pipe shapes & dimensions.{" "}
      </CustomText>

      <CustomView style={{ borderWidth: 2, width: 350 }}>
        <CustomView dir="horiz" style={{ justifyContent: "center" }}>
          <CustomPicker
            onValueChange={(value) => {
              setShape(value);
            }}
            value={shape}
            items={[
              { label: "triangular", value: "triangular" },
              { label: "circular", value: "circular" },
              { label: "rectangular", value: "rectangular" },
            ]}
            style={globalStyles.picker}
            useNativeAndroidPickerStyle={false}
          />
        </CustomView>

        <Image source={img} />

        {shape === "rectangular" || shape === "triangular" ? (
          <CustomView>
            <CustomView dir="horiz">
              <CustomInput
                placeholder="Height"
                onChangeText={setHeight}
                value={height}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setHeightUnit(value);
                }}
                value={heightUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>

            <CustomView dir="horiz">
              <CustomInput
                placeholder="Width"
                onChangeText={setWidth}
                value={width}
              />
              <CustomPicker
                onValueChange={(value) => {
                  setWidthUnit(value);
                }}
                value={widthUnit}
                items={distanceUnits}
                style={globalStyles.picker}
                useNativeAndroidPickerStyle={false}
              />
            </CustomView>
          </CustomView>
        ) : shape === "circular" ? (
          <CustomView dir="horiz">
            <CustomInput
              placeholder="Radius"
              onChangeText={setRadius}
              value={radius}
            />
            <CustomPicker
              onValueChange={(value) => {
                setRadiusUnit(value);
              }}
              value={radiusUnit}
              items={distanceUnits}
              style={globalStyles.picker}
              useNativeAndroidPickerStyle={false}
            />
          </CustomView>
        ) : null}
      </CustomView>

      {area ? (
        <CustomView>
          <CustomView dir="horiz">
            <CustomText>Area: {area.toFixed(3)}</CustomText>
            <View style={{ flexDirection: "row" }}>
              <CustomText>m</CustomText>
              <Text style={{ fontSize: 15 }}>2</Text>
            </View>
          </CustomView>

          <CustomView dir="horiz">
            <CustomText>
              Wetted Perimeter: {wettedPerimeter.toFixed(3)} m
            </CustomText>
          </CustomView>

          <CustomView dir="horiz">
            <CustomText>Hydraulic Radius: {hydRad.toFixed(3)} m</CustomText>
          </CustomView>
        </CustomView>
      ) : null}

      <CustomPressable
        icon="bulb1"
        onPress={() => setModalVisible(!modalVisible)}
      >
        Learn more
      </CustomPressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CustomView style={{ flex: 1 }}>
          <ScrollView>
            <CustomTitle>Hydraulic Radius Explained</CustomTitle>
            <CustomText>
              The hydraulic radius is a crucial parameter in fluid mechanics
              that characterizes the efficiency of a pipe or channel in
              transporting water. It is defined as the ratio of the
              cross-sectional area of the flow to the wetted perimeter. The
              hydraulic radius is a key factor in determining the frictional
              losses and the velocity distribution of flowing water.
            </CustomText>
            <CustomText>
              For circular pipes, the hydraulic radius R is simply the radius r
              of the pipe. Mathematically, R is given by R = r. The
              cross-sectional area A of a circular pipe is given by
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${A=\\pi r^2}$"}
            </MathJaxSvg>
            <CustomText>and the wetted perimeter P is given by</CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${P=2 \\pi r}$"}
            </MathJaxSvg>
            <CustomText>
              For triangular pipes, the hydraulic radius is calculated
              differently based on the type of triangle. If the triangle is
              equilateral (all sides and angles are equal), the hydraulic radius
              R is given by
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${R} = {h \\over 2 \\sqrt3}$"}
            </MathJaxSvg>
            <CustomText>
              where h is the height of the equilateral triangle. The
              cross-sectional area A is given by
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${A = {\\sqrt 3 \\over 4}  h^2}$"}
            </MathJaxSvg>
            <CustomText>and the wetted perimeter P is given by </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${P = 3h}$"}
            </MathJaxSvg>
            <CustomText>
              For other types of triangles, the hydraulic radius formula may
              vary based on the specific dimensions and geometry.
            </CustomText>
            <CustomText>
              For rectangular pipes, the hydraulic radius R is expressed as
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${R} = {h \\over 2}$"}
            </MathJaxSvg>
            <CustomText>
              where h is the height of the rectangular pipe. The cross-sectional
              area A is
            </CustomText>

            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${A = b h}$"}
            </MathJaxSvg>

            <CustomText>
              where b is the base width, and the wetted perimeter P is given by
            </CustomText>
            <MathJaxSvg
              color={globalStyles.equation.color}
              fontSize={globalStyles.equation.fontSize}
            >
              {"${P = b+2h}$"}
            </MathJaxSvg>

            <CustomText>
              The hydraulic radius is essential in calculations related to open
              channel flow, such as Manning's equation, which relates flow
              velocity, channel slope, hydraulic radius, and the Manning
              roughness coefficient to determine the flow rate in an open
              channel. Engineers use these formulas to design efficient and
              effective water transport systems, ensuring optimal hydraulic
              performance and minimizing energy losses in pipes and channels of
              different shapes and dimensions.
            </CustomText>
            <CustomPressable
              icon="back"
              onPress={() => setModalVisible(!modalVisible)}
            >
              Go Back
            </CustomPressable>
          </ScrollView>
        </CustomView>
      </Modal>
    </CustomView>
  );
}
