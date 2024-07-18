import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLOR } from "../../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { reusbale } from "../../../constants/Style";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import CustomStepIndicator from "../../../components/CustomStepIndicator";

const TrackOrder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.deliveryDetailContainer}>
        <View style={styles.deliveryDetailsInnerContainer}>
          <View style={styles.rowGap5}>
            <MaterialCommunityIcons name="clock-time-eight-outline" size={20} />
            <Text style={styles.flexFont15}>Deliver today at 3:00 pm</Text>
          </View>

          <Text style={styles.font15Bold}>Change time</Text>
        </View>

        <View style={styles.deliveryDetailsInnerContainer}>
          <View style={styles.rowGap5}>
            <Ionicons name="location-outline" size={20} />
            <Text style={styles.flexFont15}>
              Salt lake sector 5, Kokata, West Bengal
            </Text>
          </View>

          <Text style={styles.font15Bold}>Edit</Text>
        </View>

        <View
          style={{
            borderWidth: 0.2,
            borderColor: COLOR.grey,

            // marginHorizontal:10
          }}
        />

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: COLOR.primary, fontWeight: "500" }}>
            Write instruction (optional)
          </Text>
        </View>
      </View>

      <View style={styles.userDetilsContaner}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "500" }}>Billu King</Text>
          <Text style={{ color: COLOR.darkGrey }}>Your courier</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <MaterialIcons
            name="wifi-calling-3"
            size={24}
            color={COLOR.primary}
          />
          <MaterialCommunityIcons
            name="android-messages"
            size={24}
            color={COLOR.primary}
          />
        </View>
      </View>

      <View style={reusbale.heightSpacer(15)} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Order SWIFT9783
          </Text>
          <Text>
            Amount <Text style={{ fontWeight: "500" }}>₹ 8585</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.cancelOdrBtn} onPress={() => {}}>
          <Text style={{ color: COLOR.primary }}>Cancel order</Text>
        </TouchableOpacity>
      </View>
      <View style={reusbale.heightSpacer(25)} />

      <Text style={{ fontWeight: "500", fontSize: 20 }}>ETA: 15 minutes</Text>

      <CustomStepIndicator />
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  deliveryDetailContainer: {
    gap: 10,
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 10,
    borderColor: COLOR.darkGrey,
    backgroundColor: "#fff",
  },

  deliveryDetailsInnerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  flexFont15: {
    fontSize: 15,
    width: "70%",
    color: COLOR.darkGrey,
  },
  font15Bold: {
    fontSize: 15,
    fontWeight: "500",
  },
  rowGap5: {
    flexDirection: "row",
    gap: 5,
    flex: 1,
    alignItems: "flex-start",
  },

  userDetilsContaner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.mediumGrey,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  profileImage: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  cancelOdrBtn: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    // padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
