import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLOR } from "../constants/Colors";
import { useSelector } from "react-redux";
import { getAllCategory } from "../slice/Category/categorySlice";
import { mScale, rH, rW } from "../constants/Style";

const Category = ({ category, currentCategory, handleSelectedCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: mScale(135) }}
    >
      {category &&
        category.map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleSelectedCategory(item.id);
            }}
            key={index}
            style={[
              styles.categoryContainer,
              {
                backgroundColor:
                  item.id === currentCategory ? COLOR.primary : "#fff",
              },
            ]}
          >
            <View style={styles.categoryImgContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            {/* <View style={reusbale.heightSpacer(10)} /> */}
            <Text
              numberOfLines={1}
              style={[
                styles.categoryName,
                {
                  color: item.id === currentCategory ? "#fff" : COLOR.black,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    height: mScale(120),
    width: mScale(100),
    backgroundColor: COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 5,
    marginRight: mScale(10),
    marginLeft: mScale(10),
    elevation: 5,
    marginTop: mScale(5),
    shadowColor: COLOR.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  categoryImgContainer: {},
  image: {
    height: mScale(70),
    width: mScale(70),
    resizeMode: "cover",
    borderRadius: 50,
  },

  categoryName: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
