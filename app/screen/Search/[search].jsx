import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBarComponent from "../../../components/SearchBarComponent";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import ProductSearchList from "../../../components/ProductSearchList";
import { MasonryFlashList } from "@shopify/flash-list";
import { useDispatch, useSelector } from "react-redux";
import {
  loading,
  resetState,
  searchData,
  searchProduct,
} from "../../../slice/Search/SearchSlice";
import TransparentLoader from "./../../../components/Loader/TransparentLoader";
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FilterComponent from "../../../components/Filter/Filter";



const Search = () => {
  const navigation = useNavigation();
  const { search } = useLocalSearchParams();
  const dispatch = useDispatch();
  const product = useSelector(searchData);
  const searchLoading = useSelector(loading);
  const pageRoute = useRoute();


  useEffect(() => {
    const searchBody = {
      search: search,
    };
    dispatch(searchProduct(searchBody));
    return () => {
      dispatch(resetState());
    };
  }, [search]);

  const bottomSheetRef = useRef();

  const openFilterBottomSheet = () => {

    bottomSheetRef.current?.present();
  }

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
              search={search}
            //   autoFocus={true}
            />

            {pageRoute.name === "screen/Search/[search]" ? <TouchableOpacity activeOpacity={1} onPress={openFilterBottomSheet}>
              <AntDesign name="filter" size={28} />
            </TouchableOpacity> : <Link href={"/"}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Cancel</Text>
            </Link>}


            {/* <Link href={"/"}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Cancel</Text>
            </Link> */}
          </View>
        </SafeAreaView>
      ),
    });
  }, []);




  return (
    <View style={styles.container}>

      <FilterComponent ref={bottomSheetRef} />

      {searchLoading && <TransparentLoader loading={true} />}

      {/* <FlatList
        data={product}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
      
        renderItem={({ item }) => <ProductSearchList item={item} />}
      /> */}

      <MasonryFlashList
        data={product}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        numColumns={2}
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={5}
        renderItem={({ item }) => <ProductSearchList item={item} />}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
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

  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 70,
    paddingHorizontal: 15,
  },
});
