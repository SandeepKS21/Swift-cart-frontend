import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import PrimaryBtn from "../../../components/primaryBtn";
import { COLOR } from "../../../constants/Colors";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  authError,
  authVerifyOtp,
  isLoading,
  resetState,
  responseMessage,
} from "../../../slice/authSlice";
import { Notifier, Easing } from "react-native-notifier";
import { notifier } from "../../../utils/comman";

const OtpVerification = () => {
  const navigation = useNavigation();

  const { mobile } = useLocalSearchParams();

  const [otp, setOtp] = useState(null);
  const dispatch = useDispatch();

  const loading = useSelector(isLoading);
  const error = useSelector(authError);
  // const message = useSelector(responseMessage);

  const verifyOtp = async () => {
    const userBody = {
      mobile: mobile,
      otp: otp,
    };
    const data = await dispatch(authVerifyOtp(userBody));

    if (data && data.payload && data.payload.code === 200) {
      navigation.replace("(drawer)");
    }
  };

  const handleCodeFilled = (code) => {
    if (error) {
      dispatch(resetState());
    }

    setOtp(code);
  };

  useEffect(() => {
    if (error) {
      notifier(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>Enter 4 digit number send to</Text>
        <View style={styles.height(10)} />

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>+{mobile}</Text>

        <OTPInputView
          style={{
            width: "70%",
            height: 100,
          }}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          keyboardTyp={"number"}
          onCodeFilled={(code) => {
            handleCodeFilled(otp);
          }}
          onCodeChanged={(code) => {
            // console.log("code changed", code);

            handleCodeFilled(code);
          }}
        />
      </View>

      <View style={styles.height(20)} />

      <PrimaryBtn
        text={"Verify & procced"}
        onPress={verifyOtp}
        loading={loading}
      />

      <View style={styles.height(10)} />

      <TouchableOpacity>
        <Text style={{ color: COLOR.grey, textAlign: "right" }}>Resend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },

  underlineStyleHighLighted: {},

  underlineStyleBase: {
    color: "black",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "black",
    fontSize: 22,
    fontWeight: "bold",
  },

  height: (height) => ({
    height: height,
  }),
});
