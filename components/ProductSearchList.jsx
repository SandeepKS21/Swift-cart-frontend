import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLOR } from "../constants/Colors";
import { reusbale } from "../constants/Style";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatNumberIndian } from "../utils/comman";
import { Link } from "expo-router";

const ProductSearchList = ({ item }) => {
  return (
    <View style={styles.container}>
      <Link href={`/screen/Product/${item._id}`} asChild>

        <TouchableOpacity activeOpacity={1} style={styles.productContainer}>
          <Image style={styles.img} source={{ uri: item.coverImg }} />

          <View style={reusbale.heightSpacer(2)} />

          <View style={{ width: "80%" }}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={reusbale.heightSpacer(4)} />

            <Text numberOfLines={2} style={styles.desc}>
              {item.description}
            </Text>
          </View>

          <View style={reusbale.heightSpacer(8)} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              ₹{formatNumberIndian(item.discountPrice)}
            </Text>
            {/* <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
            <Text style={styles.btnText}>Add to cart</Text>
          </TouchableOpacity> */}

            <TouchableOpacity
              style={{ backgroundColor: "#faeaec", borderRadius: 5 }}
            >
              <Ionicons name="add-outline" size={20} color={COLOR.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProductSearchList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  productContainer: {
    borderRadius: 7,
    borderColor: COLOR.mediumGrey,
    borderWidth: 1,
    padding: 7,
    // shadowColor: COLOR.primary,
    borderStartWidth: 1,
    alignItems: "flex-start",
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    borderRadius: 7,
  },
  productName: {
    fontWeight: "500",
  },
  desc: {
    color: COLOR.darkGrey,
  },
  primaryBtn: {
    backgroundColor: COLOR.primary,
    padding: 7,

    borderRadius: 7,
  },
  btnText: {
    color: "#fff",
  },
});
