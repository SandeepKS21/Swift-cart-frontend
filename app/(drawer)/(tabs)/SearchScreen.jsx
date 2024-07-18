import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import Animated, { FadeInUp } from "react-native-reanimated";

import SearchBarComponent from "../../../components/SearchBarComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getUserDetails,
  userRecentSearch,
} from "../../../slice/User/UserSlice";

const trendingWords = [
  "ZenScape Smart Garden",
  "EcoPods",
  "Water Bottle",
  "PulseFit Tracker",
  "SolarRay Portable Charger",
  "FlexStand Adjustable Desk",
  "MiniCharge",
];
// const recentSearch = [
//   "EcoClear Air Purifier",
//   "SolarStream Water Heater",
//   "QuantumSpeed SSD",
//   "BioFit Smartwatch",
//   "GreenGrow LED Panel",
// ];

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recentSearch = useSelector(userRecentSearch);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserDetails());
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",

      header: () => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.searchContaner}>
            <SearchBarComponent
              placeholder={"Search products..."}
              isRightIcon={true}
              rightIconName={"close-circle"}
              autoFocus={true}
            />
            <Link href={"/"}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Cancel</Text>
            </Link>
          </View>
        </SafeAreaView>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "500", fontSize: 22 }}>Trending</Text>

        <View style={reusbale.heightSpacer(15)} />

        <Animated.View
          style={styles.trendingWordContainer}
          entering={FadeInUp.delay(100)}
        >
          {trendingWords.map((item, index) => {
            return (
              <Link href={`screen/Search/${item}`} asChild key={index}>
                <TouchableOpacity
                  style={styles.trendingWordBox}
                  key={index}
                  onPress={() => { }}
                >
                  <Text style={{ fontWeight: "500", color: COLOR.darkGrey }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </Link>
            );
          })}
        </Animated.View>

        <View style={reusbale.heightSpacer(25)} />

        {recentSearch.length > 0 && (
          <Text style={{ fontWeight: "500", fontSize: 22 }}>Recent search</Text>
        )}

        <View style={reusbale.heightSpacer(15)} />

        <Animated.View
          style={styles.recentSearchContainer}
          entering={FadeInUp.delay(100)}
        >
          {recentSearch.map((searchName, index) => (
            <Link href={`screen/Search/${searchName}`} asChild key={index}>
              <TouchableOpacity style={styles.recentSearch} onPress={() => { }}>
                <Entypo name="back-in-time" size={20} />

                <Text
                  style={{
                    fontSize: 16,
                    color: COLOR.darkGrey,
                    flex: 1,
                  }}
                >
                  {searchName}
                </Text>
                <MaterialCommunityIcons name="arrow-top-left" size={18} />
              </TouchableOpacity>
            </Link>
          ))}
        </Animated.View>
        <View style={reusbale.heightSpacer(15)} />
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingHorizontal: 15,
  },
  searchContaner: {
    backgroundColor: "#fff",
    height: 70,
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },

  trendingWordContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  trendingWordBox: {
    borderWidth: 0.3,
    borderColor: COLOR.grey,
    padding: 5,
    borderRadius: 5,
  },

  recentSearchContainer: {
    gap: 15,
  },
  recentSearch: {
    flexDirection: "row",
    gap: 15,
  },
});
