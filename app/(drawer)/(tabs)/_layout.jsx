import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import HomeHeader from "../../../components/HomeHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ImageBackground, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          paddingVertical: 5,
        },
        tabBarBackground: () => {
          // <ImageBackground
          //   style={{ height: 20, width: 20 }}
          //   source={{
          //     uri: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          //   }}
          // />;
        },
      }}
    >
      
      <Tabs.Screen
        name="index"
        options={{
          header: () => <HomeHeader />,
          tabBarLabel: "",
          tabBarIcon: ({ size, color, focused }) => (
            <AntDesign
              name="home"
              size={27}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="SearchScreen"
        options={({ route }) => ({
          tabBarLabel: "",
          tabBarStyle: {
            display: route.name === "SearchScreen" ? "none" : "flex",
          },
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="search"
              size={27}
              color={focused ? "red" : "black"}
            />
          ),
        })}
        // options={{
        //   // header: () => <HomeHeader />,
        //   tabBarLabel: "",
        //   tabBarIcon: ({ size, color, focused }) => (
        //     <Ionicons
        //       name="search"
        //       size={27}
        //       color={focused ? "red" : "black"}
        //     />
        //   ),
        // }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, color, focused }) => (
            <Feather
              name="shopping-bag"
              size={27}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="History"
        options={{
          headerTitle: "Order History",
          tabBarLabel: "",
          tabBarIcon: ({ size, color, focused }) => (
            <AntDesign
              name="profile"
              size={27}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, color, focused }) => (
            <EvilIcons
              name="user"
              size={37}
              color={focused ? "red" : "black"}
            />
          ),
          tabBarIconStyle: { bottom: 4 },
        }}
      />
    </Tabs>
  );
}
