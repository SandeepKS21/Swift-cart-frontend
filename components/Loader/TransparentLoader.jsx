import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { COLOR } from "../../constants/Colors";

const TransparentLoader = ({ loading = false }) => {

  return (
    <Modal transparent={true} animationType="none" visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    </Modal>
  );
};

export default TransparentLoader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
