import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PopularProductList from "../../../components/PopularProductList";
import RowListHeader from "../../../components/RowListHeader";
import OfferCard from "../../../components/OfferCard";
import Category from "../../../components/Category";
import { reusbale } from "../../../constants/Style";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, token, userDetails } from "../../../slice/authSlice";
import { readItem, removeItem } from "../../../utils/localStorage";
import {
  categoryData,
  getAllCategory,
  categoryLoading,
  error,
} from "../../../slice/Category/categorySlice";
import Loader from "../../../components/Loader";
import {
  getproduct,
  getAllProducts,
} from "../../../slice/Product/productSlice";

import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { rH, rW, mScale } from "./../../../constants/Style";

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const category = useSelector(categoryData);
  const categoryloading = useSelector(categoryLoading);
  const product = useSelector(getproduct);

  const [refreshing, setRefreshing] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProducts());
  }, [dispatch]);

  // remove item from async storage
  // removeItem("token")

  // if (!user) {
  //   return <Redirect href="/screen/auth/sendOtp" />;
  // }

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getAllCategory());
    dispatch(getAllProducts());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handleSelectedCategory = (index) => {
    setCurrentCategory(index);
  };

  // console.log('currentCategory', currentCategory)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {categoryloading !== "pending" ? (
          <View
            style={[
              styles.container,
              { marginTop: Platform.OS === "ios" ? 0 : rH(8) },
            ]}
          >
            <View style={reusbale.heightSpacer(10)} />

            <Text style={styles.heaterText}>
              Get Your <Text style={styles.boldText}>Products</Text> delivered
              quickly
            </Text>
            <View style={reusbale.heightSpacer(10)} />

            <Category
              category={category}
              handleSelectedCategory={handleSelectedCategory}
              currentCategory={currentCategory}
            />
            <View style={reusbale.heightSpacer(10)} />

            <RowListHeader title={"Bundle offer"} />

            <View style={reusbale.heightSpacer(5)} />

            <OfferCard offers={product} />

            <RowListHeader title={"Popular"} />
            <View style={reusbale.heightSpacer(15)} />

            {/* <PopularProductList /> */}

            <FlatList
              scrollEnabled={false}
              data={product}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <PopularProductList item={item} />}
            />
          </View>
        ) : (
          <View style={{ marginTop: 400 }}>
            <Loader />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },

  heaterText: {
    fontSize: mScale(20),
    // width: 200,
    lineHeight: mScale(31),
    paddingHorizontal: 15,
    width: "55%",
  },

  boldText: {
    fontWeight: "bold",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
