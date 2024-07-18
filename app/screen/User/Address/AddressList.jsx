import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { COLOR } from "./../../../../constants/Colors";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { reusbale } from "./../../../../constants/Style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  userData,
  userSliceLoading,
} from "../../../../slice/User/UserSlice";
import Loader from "./../../../../components/Loader";
import { Link, useRouter } from "expo-router";
import { showToast } from "../../../../utils/comman";
const AddressList = () => {
  const dispatch = useDispatch();
  const { address } = useSelector(userData);
  const loading = useSelector(userSliceLoading);
  const route = useRouter();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleNewAddress = () => {
    if (address && address.length >= 2) {
      return showToast("You can add up to 2 addresses", (typpe = "error"));
    }

    route.push("/screen/User/Address/new");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={reusbale.heightSpacer(10)} />

        <TouchableOpacity
          style={styles.rowSpaceBetween}
          activeOpacity={1}
          onPress={handleNewAddress}
        >
          <Text style={styles.text}>Add new address</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>

        <View
          style={{
            borderColor: COLOR.grey,
            borderWidth: StyleSheet.hairlineWidth,
            marginTop: 10,
          }}
        />
        <View style={reusbale.heightSpacer(10)} />
        <Text style={styles.boldText}>Personal Address</Text>
        <View style={reusbale.heightSpacer(5)} />

        {address &&
          address.map((userAddress, index) => (
            <View style={styles.addressContainer} key={userAddress._id}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text>Default:</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://i.pinimg.com/originals/da/c7/58/dac758d7606690d057a9cbba5f259154.png",
                  }}
                />
              </View>

              <View
                style={{
                  borderColor: COLOR.grey,
                  borderWidth: StyleSheet.hairlineWidth,
                  marginTop: 10,
                }}
              />
              <View style={reusbale.heightSpacer(5)} />

              <View style={styles.develiveryLocation}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Sandeep
                </Text>
                <Text style={[styles.addressText, { width: "80%" }]}>
                  {userAddress.address}, {userAddress.city}, {userAddress.state}{" "}
                  {userAddress.pinCode}
                </Text>
                <Text style={styles.addressText}>Phone number: 9636828509</Text>
                <Text style={styles.addressText}>Type: {userAddress.type}</Text>
              </View>

              <View style={reusbale.heightSpacer(10)} />

              <View style={styles.addressBtnContainer}>
                <Link href={`/screen/User/Address/${userAddress._id}`}>
                  <TouchableOpacity style={styles.addressBtn}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.addressBtn}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  boldText: {
    fontWeight: "500",
    fontSize: 20,
  },
  addressContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR.darkGrey,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  develiveryLocation: {},
  image: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  addressText: {
    fontSize: 16,
  },
  addressBtnContainer: {
    flexDirection: "row",
    gap: 15,
  },
  addressBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: COLOR.lightGrey,
    elevation: 2,
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
