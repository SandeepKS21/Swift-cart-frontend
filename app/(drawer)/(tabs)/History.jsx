import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import OrderHistoryList from "../../../components/OrderHistoryList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderList,
  loading,
  orderList,
} from "../../../slice/Order/OrderSlice";
import Loader from "../../../components/Loader";
import { Route } from "expo-router/build/Route";
import { useFocusEffect } from "expo-router";
import TransparentLoader from "../../../components/Loader/TransparentLoader";

const Tab = createMaterialTopTabNavigator();
const History = () => {
  const dispatch = useDispatch();
  const orderHistory = useSelector(orderList);
  const orderHistoryLoading = useSelector(loading);

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  // dispatch(getOrderList());

  //   }, [])
  // );

  // if (orderHistoryLoading.getOrderList) {
  //   return (
  //     <View
  //       style={{
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flex: 1,
  //         backgroundColor: "#fff",
  //       }}
  //     >
  //       <Loader />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.conatiner}>
      <Tab.Navigator
        initialRouteName="Active"
        initialLayout={{ width: Dimensions.get("window").width }}
        screenOptions={{
          tabBarStyle: styles.containerStyle,
          tabBarIndicatorStyle: styles.indicator,
          tabBarLabelStyle: { fontSize: 15 },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "black",
          tabBarPressColor: "transparent",
          animationEnable: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: [
              styles.indicator,
              {
                marginLeft: 3,
              },
            ],
          }}
          name={`Active (${orderHistory.activeOrder.length})`}
          component={Active}
          initialParams={{ orderHistory: orderHistory.activeOrder }}
        />
        <Tab.Screen
          name={`Past orders (${orderHistory.pastOrder.length})`}
          component={PastOrder}
          initialParams={{ orderHistory: orderHistory.pastOrder }}
        />
      </Tab.Navigator>

      {orderHistoryLoading.getOrderList && <TransparentLoader loading={true} />}

      <View style={reusbale.heightSpacer(15)} />
    </View>
  );
};

const Active = ({ route }) => {
  const { orderHistory } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={orderHistory}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderHistoryList item={item} />}
      />
    </View>
  );
};

const PastOrder = ({ route }) => {
  const { orderHistory } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={orderHistory}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderHistoryList item={item} />}
      />
    </View>
  );
};

{
  /* <FlatList
          data={orderHistory.active}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderHistoryList item={item} />}
        /> */
}

export default History;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

  containerStyle: {
    backgroundColor: COLOR.lightGrey,
    borderRadius: 10,
    elevation: 0,
    marginBottom: 5,
  },

  indicator: {
    backgroundColor: COLOR.primary,
    position: "absolute",
    // zIndex: -1,
    height: "90%",
    bottom: "5%",
    borderRadius: 7,
    width: "49.2%",
  },
});
