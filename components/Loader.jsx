import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import React from "react";

const Loader = () => {
  return <ActivityIndicator size={"large"} animating={true} color={"red"}/>;
};

export default Loader;

const styles = StyleSheet.create({});
