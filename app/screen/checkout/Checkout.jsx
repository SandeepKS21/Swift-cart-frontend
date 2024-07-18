import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Link, useFocusEffect, useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CartWithCount from "../../../components/Icons/CartWithCount";
import { RadioButton } from "react-native-paper";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomDatePicker from "../../../components/CustomDatePicker";
import Modal from "../../../components/Modal";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import SwipeButton from "rn-swipe-button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressDetailsWithCartCount,
  getUserDetails,
  userData,
  userSliceLoading,
} from "../../../slice/User/UserSlice";
import Loader from "../../../components/Loader";
import {
  cartProductCount,
  cartSubTotal,
} from "./../../../slice/Cart/CartSlice";
import { address } from "./../../../slice/User/UserSlice";
import { formatNumberIndian, showToast } from "../../../utils/comman";

const dateObj = new Date();
const options = { weekday: "short", month: "short", day: "numeric" };
const initialDeliveryDate = dateObj.toLocaleDateString("en-US", options);

const initialStates = {
  address: null,
  paymentMethod: "online",
};

const Checkout = () => {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [formatedTime, setFormatedTime] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(initialDeliveryDate);

  const [state, setState] = useState(initialStates);

  const handleStateChange = (changes) => {
    setState((prevState) => ({ ...prevState, ...changes }));
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loader = useSelector(userSliceLoading);
  const userDetails = useSelector(userData);
  const cartItemCount = useSelector(cartProductCount);
  const productCount = useSelector(cartProductCount);
  const subTotal = useSelector(cartSubTotal);

  const handleDeliveryTime = (time) => {
    setIsTimePickerVisible(false);
    const timeDate = new Date(time);
    const formattedTime = timeDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setFormatedTime(formattedTime);
    setDeliveryTime(time);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      //   headerShadowVisible: false,
      headerRight: () => <CartWithCount cartCount={cartItemCount} />,
    });
  }, []);

  const handledeliveryDate = (date) => {
    const dateObj = new Date(date);
    // Format the Date object
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    setDeliveryDate(formattedDate);

    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getAddressDetailsWithCartCount());
    }, [dispatch])
  );

  useEffect(() => {
    const selectedAddress = userDetails?.address?.filter(
      (location) => location.isSelected
    );
    handleStateChange({
      address: selectedAddress?.length > 0 ? selectedAddress[0]._id : null,
    });
  }, [userDetails]);

  if (loader) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const handlePayment = () => {
    const paymentBody = {
      address: state.address,
      paymentMode: state.paymentMethod,
      date: deliveryDate,
      time: formatedTime,
    };

    for (const key in paymentBody) {
      if (!paymentBody[key]) {
        return showToast(`${key} is required`, (typpe = "error"));
      }
    }

    // router.push("/screen/checkout/Payment/Payment", { paymentBody });
    router.push({
      pathname: "/screen/checkout/Payment/Payment",
      params: paymentBody,
    });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ fontWeight: "500" }}>Shipping To</Text>

          <View style={reusbale.heightSpacer(15)} />

          {userDetails.address && userDetails.address.length > 0
            ? userDetails.address.map((address) => (
                <View style={styles.addressContainer} key={address._id}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "flex-start",
                    }}
                  >
                    <RadioButton
                      color={COLOR.primary}
                      value="first"
                      status={
                        state.address === address._id ? "checked" : "unchecked"
                      }
                      onPress={() =>
                        handleStateChange({ address: address._id })
                      }
                    />

                    <TouchableOpacity
                      onPress={() =>
                        handleStateChange({ address: address._id })
                      }
                      style={styles.address}
                      activeOpacity={1}
                    >
                      <Text style={{ fontWeight: "500" }}>{address.type}</Text>
                      <Text
                        numberOfLines={1}
                        style={{ color: COLOR.darkGrey, lineHeight: 19 }}
                      >
                        {address.address}
                      </Text>

                      <Text
                        numberOfLines={2}
                        style={{ color: COLOR.darkGrey, lineHeight: 19 }}
                      >
                        {address.pinCode}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Link href={`/screen/User/Address/${address._id}`}>
                    <MaterialCommunityIcons name="pencil" size={24} />
                  </Link>
                </View>
              ))
            : null}

          {userDetails.address && userDetails.address.length >= 2 ? null : (
            <Link href={"/screen/User/Address/new"} asChild>
              <Text style={{ color: COLOR.primary, fontWeight: "500" }}>
                Add new address
              </Text>
            </Link>
          )}

          <View style={reusbale.heightSpacer(20)} />

          <Text style={{ fontWeight: "500", fontSize: 17 }}>
            Preferred delivery time
          </Text>
          <View style={reusbale.heightSpacer(15)} />

          <View style={styles.deliveryTimeContainer}>
            <Modal isModalVisible={isModalVisible} toggleModal={toggleModal}>
              <CustomDatePicker
                selectedDate={(date) => {
                  handledeliveryDate(date);
                }}
              />
            </Modal>

            <View style={styles.deliveryDateTimeContainer}>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => toggleModal()}
              >
                <Text style={{ fontWeight: "500", color: COLOR.darkGrey }}>
                  Date
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    {deliveryDate}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={18} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setIsTimePickerVisible(true)}
              >
                <Text style={{ fontWeight: "500", color: COLOR.darkGrey }}>
                  Time
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    {/* 9:00 AM - 10:00 AM */}
                    {formatedTime ? formatedTime : "Select preferred time"}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={18} />
                </View>
              </TouchableOpacity>
            </View>

            <CustomDateTimePicker
              date={deliveryTime}
              isTimePickerVisible={isTimePickerVisible}
              selectedTime={(event, selectedDate) => {
                handleDeliveryTime(selectedDate);
              }}
            />
          </View>
          <View style={reusbale.heightSpacer(15)} />

          <Text style={{ fontWeight: "500", fontSize: 17 }}>Payment mode</Text>
          <View style={reusbale.heightSpacer(10)} />

          <View style={{ gap: 10 }}>
            <View style={styles.paymentMthod}>
              <RadioButton
                color={COLOR.primary}
                value="first"
                status={state.paymentMethod === "cod" ? "checked" : "unchecked"}
                onPress={() => handleStateChange({ paymentMethod: "cod" })}
              />
              <Text style={{ fontWeight: "500" }}>Cash on Delivery</Text>
            </View>

            <View style={styles.paymentMthod}>
              <RadioButton
                color={COLOR.primary}
                value="first"
                status={
                  state.paymentMethod === "online" ? "checked" : "unchecked"
                }
                onPress={() => handleStateChange({ paymentMethod: "online" })}
              />
              <Text style={{ fontWeight: "500" }}>Online</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.placeOrderContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Total {productCount} items in cart
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 22 }}>
            ₹{formatNumberIndian(subTotal)}
          </Text>
        </View>

        <SwipeButton
          containerStyles={{ borderRadius: 7 }}
          // thumbIconImageSource={require("../../../assets/images/google.png")} // Path to your thumb icon image
          onSwipeSuccess={handlePayment} // Callback function called when swipe is successful
          title="Swipe to place order" // Button text
          railBackgroundColor={COLOR.btnColor}
          railBorderColor="transparent"
          titleColor={COLOR.primary}
          titleStyles={{ fontWeight: "500" }}

          railFillBackgroundColor={COLOR.btnColor}
          railFillBorderColor={COLOR.btnColor}
          railStyles={{borderRadius:7}}
          // thumbIconWidth={60}
          // onSwipeFail={() => {
          //   console.log("failed");
          // }}
          shouldResetAfterSuccess={true}
          thumbIconComponent={() => (
            <MaterialCommunityIcons
              name="chevron-triple-right"
              size={30}
              color={"#fff"}
            />
          )}
          thumbIconWidth={70}
          thumbIconBackgroundColor={COLOR.primary}
          thumbIconStyles={{ borderWidth: 0, borderRadius: 7 }}
          width={"100%"}
          resetAfterSuccessAnimDelay={50}
          // shouldResetAfterSuccess={true}
        />
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },

  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },

  deliveryTimeContainer: {},
  deliveryDateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateContainer: {
    backgroundColor: COLOR.lightBackground,
    padding: 7,
    borderRadius: 7,
  },
  paymentMthod: {
    flexDirection: "row",
    alignItems: "center",
  },

  placeOrderContainer: {
    paddingHorizontal: 15,
    padding: 15,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    elevation: 0.4,
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
