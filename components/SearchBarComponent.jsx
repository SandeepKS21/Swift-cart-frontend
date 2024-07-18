import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../constants/Colors";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchProduct } from "../slice/Search/SearchSlice";

const SearchBarComponent = ({
  placeholder,
  isRightIcon,
  rightIconName,
  autoFocus = false,
  search,
}) => {
  const [searchText, setSearchText] = useState("");
  const route = useRouter();
  const pageRoute = useRoute();
  const dispatch = useDispatch();
  // console.log("rout name", pageRoute.name);

  const handleSearchText = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (search && search.trim().length > 0) {
      setSearchText(search);
    }
  }, [search]);

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      if (pageRoute.name.includes("screen/Search/[search]")) {
        // console.log("included");
        const searchBody = {
          search: searchText,
        };
        dispatch(searchProduct(searchBody));
      } else {
        route.push({
          pathname: "/screen/Search/[search]",
          params: { search: searchText },
        });
      }
    }
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={24} />
      <TextInput
        autoFocus={autoFocus}
        style={{ fontSize: 16, flex: 1 }}
        placeholder={placeholder}
        onChangeText={handleSearchText}
        returnKeyType="search"
        value={searchText}
        onSubmitEditing={handleSearch}
      />
      {/* {isRightIcon && (
        <TouchableOpacity onPress={clearSearch}>
          <Ionicons name={rightIconName} color={COLOR.primary} size={24} />
        </TouchableOpacity>
      )} */}
      {isRightIcon && searchText.trim().length > 0 && (
        <TouchableOpacity onPress={clearSearch}>
          <Ionicons name={rightIconName} color={COLOR.primary} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.btnColor,
    // padding: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    gap: 10,
    flex: 1,
    borderRadius: 7,
  },
});
