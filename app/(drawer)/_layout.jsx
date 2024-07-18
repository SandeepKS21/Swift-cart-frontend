import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            // title: "overview",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="test" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Test",
            title: "TEST Screen",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});
