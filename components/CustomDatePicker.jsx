import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { COLOR } from "../constants/Colors";

const CustomDatePicker = ({ selectedDate }) => {
  const [date, setDate] = useState(dayjs());

  // console.log("date", date);
  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
        selectedItemColor={COLOR.primary}
        headerButtonColor={COLOR.primary}
        monthContainerStyle={{ backgroundColor: "#fff" }}
        calendarTextStyle={{ fontSize: 16 }}
      />

      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => {
          selectedDate(date);
        }}
      >
        <Text style={{ color: "#fff" }}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },

  selectBtn: {
    backgroundColor: COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
    borderRadius: 7,
    marginTop: 10,
  },
});
