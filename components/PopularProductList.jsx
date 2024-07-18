import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../constants/Colors";
import { Link } from "expo-router";
import { formatNumberIndian } from "../utils/comman";
import { mScale, rH, rW } from "../constants/Style";

const product = [
  {
    id: 1,
    name: "",
    image: "",
    price: "",
    weight: "",
    isCartAdded: false,
  },
];

const PopularProductList = ({ item }) => {
  return (
    <View style={styles.container}>
      <Link href={`/screen/Product/${item._id}`} asChild>
        <TouchableOpacity style={styles.productMainContainer} activeOpacity={1}>
          <Image
            style={styles.image}
            source={{
              uri: item.coverImg,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={2}
              style={{ fontSize: mScale(14), fontWeight: "500" }}
            >
              {item.name}
            </Text>
            <Text numberOfLines={1} style={{ color: COLOR.grey }}>
              {item?.weight ? item.weight : ""}
            </Text>
          </View>

          <View style={{ gap: 10, alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "500", fontSize: mScale(16) }}>
              ₹{formatNumberIndian(item.discountPrice)}
            </Text>
            <TouchableOpacity style={styles.borderBtn}>
              <Ionicons
                name="add-outline"
                size={mScale(20)}
                color={COLOR.primary}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default PopularProductList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: rH(15),
  },

  productMainContainer: {
    backgroundColor: COLOR.lightBackground,
    borderRadius: 7,
    flexDirection: "row",
    padding: mScale(9),
    gap: 15,
    alignItems: "flex-start",
    // justifyContent: "flex-start",
  },

  image: {
    height: rH(60),
    width: rW(60),
    borderRadius: 7,
    resizeMode: "contain",
  },

  borderBtn: {
    backgroundColor: "#faeaec",
    padding: 2,
    alignItems: "center",
    borderRadius:5
  },
});
