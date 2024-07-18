import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mScale } from "../constants/Style";

const RelatedProduct = ({ product }) => {
  return (
    <View style={styles.container}>
      <Link href={`/screen/Product/${product._id}`} asChild>
        <TouchableOpacity style={styles.productContainer}>
          <Image style={styles.image} source={{ uri: product.coverImg }} />
          <Text numberOfLines={1} style={{width:mScale(80)}}>{product.name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default RelatedProduct;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    // backgroundColor: "blue",
  },
  productContainer: {
    height: mScale(110),
    width: mScale(85),
    gap: 5,
  },

  image: {
    resizeMode: "contain",
    height: mScale(80),
    width: mScale(70),
    borderRadius: 7,
  },
});
