import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { COLOR } from "../../constants/Colors";
import { Link } from "expo-router";

const CartWithCount = ({ cartCount }) => {
  return (
    <View>
      <Link href={"(tabs)/Cart"}>
        <Feather name="shopping-bag" size={25} />
      </Link>
      <View style={styles.cartCountContainer}>
        <Text style={styles.cartCount}>{cartCount}</Text>
      </View>
    </View>
  );
};

export default CartWithCount;

const styles = StyleSheet.create({
  cartCountContainer: {
    position: "absolute",
    left: 15,
    backgroundColor: COLOR.primary,
    borderRadius: 100,
    // padding: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    bottom: 12,
  },

  cartCount: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
  },
});
