import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  TouchableOpacity,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLOR } from "../constants/Colors";
import { mScale, reusbale, rH } from "../constants/Style";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import Loader from "./Loader";
import { G } from "react-native-svg";

const addres = [
  {
    id: 1,
    name: "SANDEEP KUMAR SINGH",
    address: "Flat No 11, Salt lake Sector 5, Kolkata, West Bengal 700674",
  },
  {
    id: 2,
    name: "ROHAN",
    address: "Apartment 15, Sealdah, Kolkata, West Bengal 706347",
  },
];

const BottomSheetComponent = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["45%"], []);
  const route = useRouter();
  const [selectAddress, SetSelectAddress] = useState(null);

  useEffect(() => {
    SetSelectAddress(props.selectedAddress);
  }, [props]);

  // used to close bottom sheet
  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        // onPress={dismiss}
        pressBehavior={"close"}
      />
    ),
    [dismiss]
  );

  const handleLocation = () => {
    dismiss();
    route.push("screen/Location/PickLocation");
  };

  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      overDragResistanceFactor={0}
      backgroundStyle={{
        backgroundColor: COLOR.lightBackground,
        borderRadius: 0,
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={{ fontWeight: "500", fontSize: mScale(18) }}>
          Choose your location
        </Text>

        <View style={reusbale.heightSpacer(5)} />
        <Text style={{ fontSize: mScale(15) }}>
          Select a delivery location to seet product avaliability and delivery
          options
        </Text>
        <View style={reusbale.heightSpacer(15)} />

        <View style={{ height: mScale(110), width: "100%" }}>
          <BottomSheetScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
          >
            {props.address ? (
              props.address.map((location, index) => (
                <TouchableOpacity
                  key={location._id}
                  activeOpacity={1}
                  style={[
                    styles.locationBox,
                    {
                      backgroundColor:
                        selectAddress === location._id
                          ? "#fff4cc"
                          : "transparent",
                    },
                  ]}
                  onPress={() => {
                    SetSelectAddress(location._id);
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ fontWeight: "500", fontSize: mScale(16) }}
                  >
                    SANDEEP
                  </Text>
                  <Text numberOfLines={2} style={{ color: COLOR.darkGrey }}>
                    {location.address}
                  </Text>
                  <Text>{location.state}</Text>
                  <Text>{location.pinCode}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ justifyContent: "center" }}>
                <Loader />
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                dismiss();
                route.push("screen/User/Address/AddressList");
              }}
              style={[
                styles.locationBox,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Text style={{ fontWeight: "500" }}>Add an address</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </View>
        <View style={reusbale.heightSpacer(15)} />

        <TouchableOpacity
          onPress={handleLocation}
          style={styles.locationSubContainer}
        >
          <FontAwesome6 name="location-crosshairs" size={mScale(18)} />
          <Text style={{ fontSize: 16, color: "#02b6f7" }}>
            Use my current location
          </Text>
        </TouchableOpacity>

        <View style={styles.locationSubContainer}>
          <Ionicons name="location-outline" size={mScale(18)} />
          <Text style={{ fontSize: 16, color: "#02b6f7" }}>
            Enter any Indian pincode
          </Text>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    paddingHorizontal: 15,
    marginTop: mScale(5),
  },

  locationBox: {
    width: mScale(130),
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: "orange",
    gap: 2,
  },

  locationSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: rH(15),
  },
});
