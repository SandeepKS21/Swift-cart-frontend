import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import { COLOR } from "../../../constants/Colors.js";
import { reusbale } from "../../../constants/Style.js";
import PrimaryBtn from "../../../components/primaryBtn.jsx";
import * as Yup from "yup";

const addressSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required").max(500, "Address is too long"),
  pinCode: Yup.string()
    .required("Required")
    .matches(/^[0-9]{6}$/, "Pin code must be exactly 6 digits"),
  city: Yup.string().required("Required").max(100, "City name is too long"),
  state: Yup.string().required("Required").max(100, "State name is too long"),
});


// formik code
const CheckoutFormik = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Add Address</Text>
        <View style={reusbale.heightSpacer(10)} />
        <Formik
          initialValues={{ address: "", city: "", pinCode: "", state: "" }}
          validationSchema={addressSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={styles.formContainer}>
                <View>
                  <View style={styles.inputWraper}>
                    <TextInput
                      multiline={true}
                      style={styles.inputField}
                      placeholder="Address"
                      value={values.address}
                      onChangeText={handleChange("address")}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={{ color: "red" }}>{errors.address}</Text>
                  )}
                </View>

                <View>
                  <View style={styles.inputWraper}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="City"
                      value={values.city}
                      onChangeText={handleChange("city")}
                    />
                  </View>
                  {touched.city && errors.city && (
                    <Text style={{ color: "red" }}>{errors.city}</Text>
                  )}
                </View>

                <View>
                  <View style={styles.inputWraper}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Pin Code"
                      value={values.pinCode}
                      keyboardType="numeric"
                      onChangeText={handleChange("pinCode")}
                    />
                  </View>
                  {touched.pinCode && errors.pinCode && (
                    <Text style={{ color: "red" }}>{errors.pinCode}</Text>
                  )}
                </View>

                <View>
                  <View style={styles.inputWraper}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="State"
                      value={values.state}
                      onChangeText={handleChange("state")}
                    />
                  </View>
                  {touched.state && errors.state && (
                    <Text style={{ color: "red" }}>{errors.state}</Text>
                  )}
                </View>

                {/* <View style={reusbale.heightSpacer(20)} /> */}

                <PrimaryBtn
                  text={"Pay"}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default CheckoutFormik;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // paddingTop: 10,
    marginTop: 10,
  },

  inputWraper: {
    borderWidth: 0.5,
    borderColor: COLOR.darkGrey,
    borderRadius: 5,
  },

  inputField: {
    padding: 7,
    fontSize: 18,
  },
  formContainer: {
    gap: 25,
  },
});
