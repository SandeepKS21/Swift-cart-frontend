import { StyleSheet, Text, Touchable, View } from "react-native";
import React, { useEffect } from "react";
import { COLOR } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { reusbale } from "../constants/Style";
import { TouchableOpacity } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
import { formatNumberIndian } from "../utils/comman";

const OrderHistoryList = ({ item }) => {
  const navigation = useNavigation();
  const route = useRouter();

  return (
    <View style={styles.orderContainer}>
      <View>
        <Link
          href={`screen/Order/${item._id}`}
          asChild
          style={styles.orderDetails}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                {/* {item.date} */}
                Sun, 15 Apr 2024
              </Text>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  ₹{formatNumberIndian(item.totalAmount)}
                </Text>
                <Feather name="chevron-right" size={16} />
              </TouchableOpacity>
            </View>

            <Text style={{ fontWeight: "500" }}>Order SWIFT{item.orderId}</Text>

            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Feather name="shopping-bag" size={16} />
              <Text numberOfLines={3} style={{ color: COLOR.darkGrey }}>
                {/* {item.item} */}
                Laptop, Headphones
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <FontAwesome name="circle" />
              <Text style={{ fontWeight: "500", color: "blue" }}>
                Delivered at {item.shippingAddress.address}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>

        <View style={reusbale.heightSpacer(10)} />

        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: COLOR.grey,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 60,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: "500", color: COLOR.darkGrey }}>
              Cancel order
            </Text>
          </TouchableOpacity>

          <Link href={"screen/Order/TrackOrder"} asChild>
            <TouchableOpacity>
              <Text style={{ fontWeight: "500", color: COLOR.primary }}>
                Track your order
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default OrderHistoryList;

const styles = StyleSheet.create({
  orderContainer: {
    borderWidth: 0.2,
    // borderColor: COLOR.grey,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 15,
    marginBottom: 24,
    flex: 1,
  },
  orderDetails: {
    gap: 7,
  },
});
