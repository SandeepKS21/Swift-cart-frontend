import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Popularity", value: "1" },
  { label: "Price", value: "2" },
  { label: "Rating", value: "3" },
  { label: "Availability", value: "4" },
];

const CustomDropdown = () => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  //   const renderLabel = () => {
  //     if (value || isFocus) {
  //       return (
  //         <Text style={[styles.label, isFocus && { color: "blue" }]}>
  //           Dropdown label
  //         </Text>
  //       );
  //     }
  //     return null;
  //   };

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      // inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      // search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? "Select item" : "..."}
      // searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      containerStyle={styles.dropDownContainer}

      // renderLeftIcon={() => (
      //   <AntDesign
      //     style={styles.icon}
      //     color={isFocus ? "blue" : "black"}
      //     name="Safety"
      //     size={20}
      //   />
      // )}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    // width: "27%",
    width: 80,
  },

  dropDownContainer: {
    width: 120,
  },

  icon: {
    marginRight: 5,
  },
  //   label: {
  //     position: "absolute",
  //     backgroundColor: "white",
  //     left: 22,
  //     top: 8,
  //     zIndex: 999,
  //     paddingHorizontal: 8,
  //     fontSize: 14,
  //   },
  //   placeholderStyle: {
  //     fontSize: 16,
  //   },
  //   selectedTextStyle: {
  //     fontSize: 16,
  //   },
  iconStyle: {
    // width: 20,
    // height: 20,
    display: "none",
  },
  //   inputSearchStyle: {
  //     height: 40,
  //     fontSize: 16,
  //   },
});
