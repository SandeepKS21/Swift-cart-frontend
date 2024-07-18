import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { COLOR } from "../constants/Colors";
import { mScale } from "../constants/Style";

const RowListHeader = ({ title }) => {
  return (
    <View style={styles.rowHeader}>
      <Text style={{ fontWeight: "bold", fontSize: mScale(18) }}>{title}</Text>

      <Link href={"/"}>
        <Text style={{ color: COLOR.primary }}>View all</Text>
      </Link>
    </View>
  );
};

export default RowListHeader;

const styles = StyleSheet.create({
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
