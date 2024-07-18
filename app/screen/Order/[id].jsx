import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import { Colors } from "react-native-paper";
import PrimaryBtn from "../../../components/primaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, loading, order } from "../../../slice/Order/OrderSlice";
import Loader from "../../../components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatNumberIndian } from "../../../utils/comman";

const OrderSummery = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const disptach = useDispatch();
  const item = useSelector(order);
  const orderLoading = useSelector(loading);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);

  useEffect(() => {
    disptach(getOrderById(id));
  }, [id]);

  if (orderLoading.getOrderById) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.orderHeaderContainer}>
          <View>
            <View style={styles.orderHeader}>
              <Text style={{ fontWeight: "500", fontSize: 20 }}>
                Order #SWIFT{item?.orderId}
              </Text>
              <View style={styles.orderNumberContainer}>
                <AntDesign name="checkcircle" color={"green"} />
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  {item?.status}
                </Text>
              </View>
            </View>
            <Text style={{ color: COLOR.darkGrey }}>
              Delivery on {item?.shippingDateTime.shippingDate}
              {item?.shippingDateTime.shippingTime}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Payment Method
            </Text>
            <Text style={{ color: COLOR.darkGrey, fontWeight: "400" }}>
              Card
            </Text>
          </View>
        </View>

        <View style={reusbale.heightSpacer(10)} />

        <View style={styles.itemContainer}>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Items</Text>
          <Ionicons name="pencil" size={18} />
        </View> */}

          {/* <View style={reusbale.heightSpacer(10)} /> */}

          {item?.item?.map((items, index) => (
            <Link href={`/screen/Product/${items.product}`} key={index} asChild>
              <TouchableOpacity activeOpacity={0.7} style={styles.item}>
                <Image
                  style={styles.itemImg}
                  source={{
                    uri: items.productSnapshot.coverImg,
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={{ fontWeight: "500", fontSize: 16 }}
                  >
                    {items.productSnapshot.name}
                  </Text>
                  <View style={reusbale.heightSpacer(5)} />

                  <Text
                    numberOfLines={2}
                    style={{ color: COLOR.darkGrey, fontSize: 13 }}
                  >
                    {items.productSnapshot.description}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "500", fontSize: 16 }}
                >
                  ₹{formatNumberIndian(items.totalPrice)}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}

          <View style={styles.horizontalLine} />
          <View style={reusbale.heightSpacer(10)} />

          <View style={styles.amountSubContainer}>
            <Text style={styles.boldFont}>Subtotal</Text>

            <Text style={styles.boldFont}>
              ₹{formatNumberIndian(item?.totalAmount)}
            </Text>
          </View>

          <View style={styles.amountSubContainer}>
            <Text style={styles.boldFont}>Delivery Fee</Text>

            <Text style={styles.boldFont}>₹0</Text>
          </View>

          <View style={styles.amountSubContainer}>
            <Text style={styles.boldFont}>Discount</Text>

            <Text style={styles.boldFont}>- ₹0</Text>
          </View>

          <View style={styles.horizontalLine} />
          <View style={reusbale.heightSpacer(10)} />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.boldFont}>Total</Text>
            <Text style={[styles.boldFont, { fontSize: 18 }]}>
              ₹{formatNumberIndian(item?.totalAmount)}
            </Text>
          </View>
        </View>
        <View style={reusbale.heightSpacer(15)} />

        <View style={styles.deliveryDetailsContainer}>
          <View style={[styles.rowSpaceBetween, { marginBottom: 15 }]}>
            <View style={[styles.rowSpaceBetween, { gap: 5 }]}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={20}
              />
              <Text style={{ color: COLOR.darkGrey }}>
                {/* Delivery Today at 3:00 pm */}
                {item?.shippingDateTime.shippingDate}
                {item?.shippingDateTime.shippingTime}
              </Text>
            </View>
            <Text style={{ fontWeight: "500" }}>Change Time</Text>
          </View>

          <View style={styles.rowSpaceBetween}>
            <View style={[styles.rowSpaceBetween, { gap: 5, maxWidth: "60%" }]}>
              <Ionicons name="location-outline" size={20} />
              <Text numberOfLines={2} style={{ color: COLOR.darkGrey }}>
                {/* Salt lake, Kolkata, West Bengal 700125 */}
                {item?.shippingAddress.address} {item?.shippingAddress.pinCode}
              </Text>
            </View>

            <Text style={{ fontWeight: "500" }}>Edit</Text>
          </View>
        </View>
        <View style={reusbale.heightSpacer(10)} />

        <PrimaryBtn text={"Reorder"} />
      </View>
    </ScrollView>
  );
};

export default OrderSummery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  orderHeaderContainer: {
    gap: 10,
    borderRadius: 7,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderColor: COLOR.mediumGrey,
  },
  itemContainer: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLOR.mediumGrey,
  },

  itemListContainer: {},
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 20,
  },

  itemImg: {
    height: 70,
    width: 70,
    resizeMode: "contain",
    borderRadius: 7,
  },

  amountSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  boldFont: {
    fontWeight: "500",
    fontSize: 15,
  },

  horizontalLine: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR.mediumGrey,
  },

  deliveryDetailsContainer: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLOR.mediumGrey,
  },

  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
