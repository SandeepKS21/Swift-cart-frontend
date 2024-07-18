import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";

const CustomModal = ({ children, isModalVisible, toggleModal }) => {
  //   const [isModalVisible, setModalVisible] = useState(false);

  //   const toggleModal = () => {
  //     setModalVisible(!isModalVisible);
  //   };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={toggleModal}>
        <Text>Show modal</Text>
      </TouchableOpacity> */}

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={toggleModal}
      >
        <View style={styles.modalContainer}>
          {children}

          {/* <TouchableOpacity onPress={toggleModal}>
            <Text>Hide modal</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 7,
  },
});
