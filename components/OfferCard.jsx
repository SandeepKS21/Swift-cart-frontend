import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { COLOR } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { formatNumberIndian } from "../utils/comman";
import { mScale, rW, rH } from "../constants/Style";

const OfferCard = ({ offers }) => {
  return (
    <View style={styles.productMainContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 5 }}
      >
        {offers.map((item, index) => (
          <Link
            href={`/screen/Product/${item._id}`}
            key={index}
            style={{ marginRight: rW(20), marginTop: mScale(1) }}
          >
            <View style={styles.productContainer}>
              <Image style={styles.image} source={{ uri: item.coverImg }} />

              <View style={{ paddingTop: 5, gap:7 }}>
                <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ color: COLOR.grey }} numberOfLines={2}>
                  {item.description}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: mScale(5),
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: mScale(15) }}>
                    ₹{formatNumberIndian(item.discountPrice)}
                  </Text>

                  <TouchableOpacity
                    style={{ backgroundColor: "#faeaec", borderRadius: 5 }}
                  >
                    <Ionicons
                      name="add-outline"
                      size={mScale(20)}
                      color={COLOR.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  productMainContainer: {
    // paddingHorizontal: 15,
    // backgroundColor: "red",
    height: mScale(240),
    padding: 5,
  },

  productContainer: {
    backgroundColor: "#fff",
    elevation: 3,
    width: mScale(150),
    // height: mScale(205),
    padding: mScale(5),
    borderRadius: 5,
    marginRight: mScale(10),
    shadowColor: COLOR.primary,
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: "60%",
    width: "100%",
    borderRadius: 5,
    height: rH(100),
    width: rW(120),
  },
});
