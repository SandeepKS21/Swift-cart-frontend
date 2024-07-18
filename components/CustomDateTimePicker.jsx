import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDateTimePicker = ({date = new Date(),isTimePickerVisible,selectedTime}) => {

  // const onChange = (event, selectedDate) => {
    // selectedTime(selectedDate);
  // };

  return (
    <View>
      {isTimePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={false}
          // onChange={onChange}
          onChange={selectedTime}
        />
      )}
    </View>
  );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({});
