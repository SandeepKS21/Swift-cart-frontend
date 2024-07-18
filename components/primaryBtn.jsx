import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { COLOR } from "../constants/Colors";

const PrimaryBtn = ({ text, onPress, loading = false,disabled=false }) => {
  return (
    <Button
      loading={loading}
      disabled={disabled}
      labelStyle={{ paddingVertical: 4, fontSize: 16 }}
      mode="contained"
      onPress={loading ? () => {} : onPress}
      buttonColor={COLOR.primary}
      style={{ borderRadius: 7, width: "100%" }}
    >
      {!loading && text}
    </Button>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({
  height: (height) => ({
    height: height,
  }),
});
