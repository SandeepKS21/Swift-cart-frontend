import { StyleSheet, Text } from "react-native";
import {
  Notifier,
  Easing,
  NotifierComponents,
  View,
} from "react-native-notifier";
import Toast from "react-native-toast-message";

export const notifier = (msg, type) => {
  Notifier.showNotification({
    title: "",
    description: msg,
    duration: 3000,
    showAnimationDuration: 200,
    Component: NotifierComponents.Alert,
    swipeEnabled: true,
    componentProps: {
      // imageSource: require('./../assets/images/fb.png'),
      alertType: type === "success" ? "success" : "error",
    },
    // showEasing: Easing.bounce,
    // onHidden: () => console.log("alert Hidden"),
    // onPress: () => console.log("alert Press"),
    hideOnPress: false,
    containerStyle: { marginTop: 30, flex: 1 },
  });
};

export const showToast = (msg, type = "success") => {
  Toast.show({
    type: type,
    text1: msg,
    // text2: "This is some something 👋",
    visibilityTime: 4000,
    // position:"bottom"
    swipeable: true,
    text1Style:{fontSize:14}
  });
};

export const formatNumberIndian = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};
