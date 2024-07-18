import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
const Layout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <NotifierWrapper>
              <Stack>
                <Stack.Screen
                  name="(drawer)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="screen/auth/sendOtp"
                  options={{ headerShown: false, headerTitle: "" }}
                />

                <Stack.Screen
                  name="screen/auth/otpVerification"
                  options={{
                    headerTitle: "OTP Verification",
                    presentation: "modal",
                  }}
                />

                {/* product details */}

                <Stack.Screen name="screen/Product/[id]" />

                <Stack.Screen
                  name="screen/checkout/Checkout"
                  options={{
                    headerTitle: "Checkout",
                  }}
                />

                <Stack.Screen
                  name="screen/User/Address/[id]"
                  options={{
                    headerTitle: "Address",
                  }}
                />

                <Stack.Screen
                  name="screen/Order/[id]"
                  options={{
                    headerTitle: "Order Summery",
                  }}
                />

                <Stack.Screen
                  name="screen/Search/[search]"
                  options={{
                    headerTitle: "Search products",
                  }}
                />

                <Stack.Screen
                  name="screen/Order/TrackOrder"
                  options={{
                    headerTitle: "Track order",
                    headerShadowVisible: false,
                    headerStyle: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
                <Stack.Screen
                  name="screen/Location/PickLocation"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="screen/User/Address/AddressList"
                  options={{
                    headerTitle: "Address",
                  }}
                />
                {/* <Stack.Screen
                name="index"
                options={{ headerTitle: "", header: () => <HomeHeader /> }}
              /> */}
              </Stack>
            </NotifierWrapper>
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({});
