import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLOR } from "../constants/Colors";
import { Swipeable } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../slice/Cart/CartSlice";
import { formatNumberIndian } from "../utils/comman";

const CartItemList = ({
  item,
  oncomponentOpen,
  removeCart,
  addFavorite,
  handleProductQuantity,
}) => {
  const rightSwipe = () => {
    return (
      <View
        style={{
          backgroundColor: COLOR.primary,
          height: 94,
          width: 80,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          marginLeft: 10,
          margin: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            ref.current.close(), removeCart(item.id);
          }}
        >
          <MaterialIcons name="delete-outline" color={"#fff"} size={34} />
        </TouchableOpacity>
      </View>
    );
  };

  const lefttSwipe = () => {
    return (
      <View
        style={{
          backgroundColor: "#06e7be",
          height: 94,
          width: 80,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          marginRight: 10,
          margin: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            ref.current.close(), addFavorite(item.id);
          }}
        >
          <MaterialIcons name="favorite-border" color={"#fff"} size={30} />
        </TouchableOpacity>
      </View>
    );
  };

  const ref = useRef();

  useEffect(() => {
    if (item.isOpen == false) {
      ref.current.close();
    }
  }, [item]);

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      renderLeftActions={lefttSwipe}
      ref={ref}
      onSwipeableOpen={() => oncomponentOpen(item.id)}
    >
      <Link
        href={`/screen/Product/${item.product.id}`}
        style={styles.container}
        asChild
      >
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              height: 80,
              width: 80,
              // backgroundColor: COLOR.lightGrey,
              borderRadius: 7,
              // padding: 5,
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: item.product.coverImg }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={{ fontWeight: "600", fontSize: 16 }}>
              {item.product.name}
            </Text>

            <Text numberOfLines={2} style={{ color: COLOR.darkGrey }}>
              {item.product.description}
            </Text>

            {item?.product.weight && (
              <Text style={{ color: COLOR.grey, fontWeight: "500" }}>
                {item.product.weight}
              </Text>
            )}
          </View>

          <View style={{ gap: 22, alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              ₹{formatNumberIndian(item.product.discountPrice)}
            </Text>

            <View style={styles.productQuantity}>
              <TouchableOpacity
                style={styles.cartQuantityBtn}
                onPress={() =>
                  handleProductQuantity(item.id, -1, item.quantity)
                }
              >
                <FontAwesome6 name="minus" size={16} color={COLOR.primary} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.primaryColor,
                  { fontSize: 18, fontWeight: "bold" },
                ]}
              >
                {item.quantity}
              </Text>
              <TouchableOpacity
                style={styles.cartQuantityBtn}
                onPress={() => handleProductQuantity(item.id, 1, item.quantity)}
              >
                <FontAwesome6 name="plus" size={16} color={COLOR.primary} />
              </TouchableOpacity>
            </View>

            {/* 
        <TouchableOpacity
          style={{
            backgroundColor: "#faeaec",
            borderRadius: 5,
            padding: 3,
            alignItems: "center",
          }}
        >
          <FontAwesome6 name="plus" size={20} color={COLOR.primary} />
     
        </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Link>
    </Swipeable>
  );
};

export default CartItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15,
    backgroundColor: "#fff",
    borderRadius: 7,
    borderColor: COLOR.primary,
    // borderWidth:0.5,
    elevation: 3,
    padding: 7,
    margin: 1,
    shadowColor: COLOR.primary,
  },
  image: {
    // width: "22%",
    resizeMode: "contain",
    aspectRatio: 1,
    borderRadius: 7,
  },

  productQuantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },

  cartQuantityBtn: {
    backgroundColor: COLOR.btnColor,
    padding: 5,
    alignItems: "center",
    borderRadius: 7,
  },
});
