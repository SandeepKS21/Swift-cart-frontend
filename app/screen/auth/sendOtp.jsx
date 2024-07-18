import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import PrimaryBtn from "../../../components/primaryBtn";
import { COLOR } from "../../../constants/Colors";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "expo-router";
import {
  authError,
  authSendOtp,
  isLoading,
  responseMessage,
} from "../../../slice/authSlice";

const SendOtp = () => {
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const [countryCode, setCountryCode] = useState(91);

  const phoneInput = useRef(null);

  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  // const resMessage = useSelector(responseMessage);
  const errorResMesasge = useSelector(authError);

  const sendOtp = async () => {
    try {
      if (value === "") {
        return alert("enter mobile no");
      }
      const mobileNo = `${countryCode} ${value}`;

      const data = await dispatch(authSendOtp({ mobile: mobileNo }));

      // .then((response) => {
      //   console.log("dispatch response", response);
      // });

      if (data && data.payload && data.payload.code === 200) {
        navigation.replace("screen/auth/otpVerification", { mobile: mobileNo });
      }
    } catch (error) {
      // need to show alert
      alert("try catch error", error);
      console.log("try catch error of otp screen", error);
    }
  };

  useEffect(() => {
    if (errorResMesasge) {
      alert(errorResMesasge);
    }
  }, [errorResMesasge]);

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>
        Enter Mobile number for{" "}
        <Text style={styles.boldText}>Login / Register</Text>
      </Text>

      <View style={styles.height(50)} />

      <View style={styles.mobileInputContainer}>
        <Text>Mobile number</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            const countryCode = text.substring(0, text.indexOf(" "));
            const phoneNumber = text.substring(text.indexOf(" ") + 1);
            const formattedText = `${countryCode} ${phoneNumber}`;
            setFormattedValue(formattedText);
            // setFormattedValue(text);
          }}
          onChangeCountry={(country) => {
            console.log("country", country.callingCode[0]);
          }}
          // withDarkTheme
          // withShadow
          autoFocus
          textInputStyle={{ height: 40, fontSize: 18 }}
          flagButtonStyle={{
            borderBottomWidth: 1,
            marginRight: 10,
            backgroundColor: "#fff",
          }}
          textContainerStyle={{
            height: 30,
            borderBottomWidth: 1,
            backgroundColor: "#fff",
          }}
          codeTextStyle={{ height: 25, fontSize: 18 }}
        />

        <View style={styles.height(30)} />

        <PrimaryBtn text={"Get OTP"} onPress={sendOtp} loading={loading} />
      </View>

      <View style={styles.height(30)} />

      <View style={styles.socialLoginContainer}>
        <Text style={{ fontSize: 15 }}>or connect with </Text>

        <View style={styles.socoalIcon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/fb.png")}
          />
        </View>

        <View style={styles.socoalIcon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/google.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default SendOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  height: (height) => ({
    height: height,
  }),

  loginText: {
    fontSize: 23,
    width: 300,
  },

  boldText: {
    fontWeight: "bold",
  },

  mobileInputContainer: {},
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  socoalIcon: {
    backgroundColor: COLOR.lightGrey,
    borderRadius: 50,
    padding: 5,
  },

  image: {
    height: 40,
    width: 40,
    resizeMode: "cover",
  },
});
