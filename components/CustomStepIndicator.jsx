import { StyleSheet, Text, View } from "react-native";
import React from "react";

import StepIndicator from "react-native-step-indicator";
import AntDesign from "@expo/vector-icons/AntDesign";
import Svg, { Circle } from "react-native-svg";
import { COLOR } from "./../constants/Colors";

const labels = [
  {
    id: 1,
    title: "Order Placed",
    desc: "4:20 PM 12/Apr/2024",
    currentSate: true,
  },
  {
    id: 2,
    title: "Item processed",
    desc: "Shipped to warehouse",
    currentSate: false,
  },
  {
    id: 3,
    title: "Delivering",
    desc: "Your order is on the way",
    currentSate: false,
  },
  {
    id: 4,
    title: "Item Delivered",
    desc: "Expected at 12:20 PM 15/Apr/2024",
    currentSate: false,
  },
];

const currentState = labels.findIndex(
  (orderStatus) => orderStatus.currentSate == true
);

const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 45,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: "transparent",
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: "#fff",
  stepStrokeUnFinishedColor: "#fff",
  separatorFinishedColor: "green",
  separatorUnFinishedColor: "grey",
  stepIndicatorFinishedColor: "#fff",
  stepIndicatorUnFinishedColor: "#fff",
  stepIndicatorCurrentColor: "#fff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fff",
  stepIndicatorLabelFinishedColor: "#fff",
  stepIndicatorLabelUnFinishedColor: "#fff",
  labelColor: "black",
  labelSize: 14,
  currentStepLabelColor: "black",
};

const CustomStepIndicator = () => {
  const renderStepIndicator =
    (currentPosition) =>
    ({ position, stepStatus }) => {
      return (
        <View>
          <Svg height="50" width="50">
            <Circle
              cx="25"
              cy="25"
              r="20"
              // stroke="green"
              stroke={currentPosition < position ? "grey" : "green"}
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="10,10" // Dash pattern: 10 units of dash, 10 units of gap
            />
          </Svg>

          {currentPosition >= position ? (
            <AntDesign
              name="check"
              size={20}
              style={{
                position: "absolute",
                top: 15,
                right: 0,
                left: 15,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
              }}
            />
          ) : (
            <></>
          )}
        </View>
      );
    };

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentState}
      labels={labels}
      direction="vertical"
      stepCount={labels.length}
      renderLabel={({ position, label, currentPosition }) => {
        return (
          <View
            style={{
              alignItems: "flex-start",
              width: 250,
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{label.title}</Text>

            <Text style={{ color: COLOR.darkGrey }}>{label.desc}</Text>
          </View>
        );
      }}
      renderStepIndicator={renderStepIndicator(currentState)}
    />
  );
};

export default CustomStepIndicator;

const styles = StyleSheet.create({});
