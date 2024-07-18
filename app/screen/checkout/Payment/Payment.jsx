import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  error,
  getPaymentLink,
  loading,
  paymentLink,
  resetState,
} from "../../../../slice/Payment/PaymentSlice";
import Loader from "../../../../components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { showToast } from "../../../../utils/comman";

const Payment = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const paymentBody = useLocalSearchParams();

  const dispatch = useDispatch();
  const paymentUrl = useSelector(paymentLink);
  const isLoading = useSelector(loading);
  const errorMsg = useSelector(error);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(getPaymentLink(paymentBody));
  }, []);

  const handlePaymentSucess = (newNavState) => {
    const { url } = newNavState;

    if (
      url.includes(
        "https://swift-cart-backend.onrender.com/v1/users/checkout/payment-success"
      )
    ) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const sessionId = urlParams.get("session_id");
      route.replace("(tabs)/History");
      // console.log("sessionId", sessionId);
    }

    if (
      url.includes(
        "https://swift-cart-backend.onrender.com/v1/users/checkout/payment-cancel"
      )
    ) {
      route.replace("/screen/checkout/Checkout");
    }
  };

  useEffect(() => {
    if (errorMsg) {
      showToast(errorMsg, (typpe = "error"));
      dispatch(resetState());
      route.back();
    }
  }, [errorMsg]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        onNavigationStateChange={handlePaymentSucess}
        style={styles.container}
        source={{ uri: paymentUrl ?? "" }}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
