import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import BottomSheetComponent from "./BottomSheetComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  userData,
  userSliceLoading,
} from "../slice/User/UserSlice";
import { mScale, rH, rW } from "./../constants/Style";

const HomeHeader = ({ handlePresentModalPress }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const [selectedAddress, SetSelectedAddress] = useState(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const dispatch = useDispatch();
  const { address } = useSelector(userData);
  const loading = useSelector(userSliceLoading);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    const selectedAddress = () => {
      const userAddress = address?.filter((location) => location.isSelected);

      const selectedAddress =
        userAddress?.length > 0 ? userAddress[0]._id : null;

      SetSelectedAddress(selectedAddress);
    };
    selectedAddress();
  }, [address]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetComponent
        ref={bottomSheetRef}
        address={address}
        loading={loading}
        selectedAddress={selectedAddress}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={26} />
        </TouchableOpacity>

        <Link href={"/"} asChild>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "flex-start" }}
            onPress={openBottomSheet}
          >
            <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              Deliver to
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Text>Salt lake, Kolkata</Text>
              <Ionicons name="chevron-down-outline" size={15} />
            </View>
          </TouchableOpacity>
        </Link>

        <Link href={"(tabs)/SearchScreen"} asChild>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={30} />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    // height: 50,
    height: rH(40),
    backgroundColor: "#fff",
    // paddingHorizontal: 15,
    paddingHorizontal: rW(15),
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
