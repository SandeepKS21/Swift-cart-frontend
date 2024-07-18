import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import { COLOR } from "../../../../constants/Colors.js";
import { reusbale } from "../../../../constants/Style.js";
import PrimaryBtn from "../../../../components/primaryBtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  address,
  getUserAddressById,
  isAddressUpdated,
  resetUserState,
  updateUserAddressById,
  userSliceLoading,
} from "../../../../slice/User/UserSlice.js";
import Loader from "../../../../components/Loader.jsx";

const addressSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required").max(100, "Address is too long"),
  pinCode: Yup.string()
    .required("Required")
    .matches(/^[0-9]{6}$/, "Pin code must be exactly 6 digits"),
  city: Yup.string().required("Required").max(30, "City name is too long"),
  state: Yup.string().required("Required").max(25, "State name is too long"),
  type: Yup.string().required("Required").max(10, "type name is too long"),
});

const Address = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const userAddress = useSelector(address);
  const addressUpdated = useSelector(isAddressUpdated);
  const loader = useSelector(userSliceLoading);

  const router = useRouter();

  useEffect(() => {
    if (id !== "new") {
      dispatch(getUserAddressById(id));
    }

    return () => {
      dispatch(resetUserState());
    };
  }, [id, dispatch]);

  const handleUpdateAddress = async (address) => {
    await dispatch(updateUserAddressById({ id, address }));
    router.back();
  };

  const handleAddNewAddress = (address) => {
    dispatch(addNewAddress(address));
  };

  // useEffect(() => {
  //   if (addressUpdated) {
  //     dispatch(resetUserState());
  //     router.back();
  //   }
  // }, [addressUpdated, dispatch]);

  if (loader) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View style={styles.container}>
        <View style={reusbale.heightSpacer(10)} />
        <Formik
          initialValues={{
            address: userAddress?.address ?? "",
            city: userAddress?.city ?? "",
            pinCode: userAddress?.pinCode?.toString() ?? "",
            state: userAddress?.state ?? "",
            type: userAddress?.type ?? "",
          }}
          validationSchema={addressSchema}
          onSubmit={(values) =>
            id !== "new"
              ? handleUpdateAddress(values)
              : handleAddNewAddress(values)
          }
          enableReinitialize
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

                <View>
                  <View style={styles.inputWraper}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Type"
                      value={values.type}
                      onChangeText={handleChange("type")}
                    />
                  </View>
                  {touched.type && errors.type && (
                    <Text style={{ color: "red" }}>{errors.type}</Text>
                  )}
                </View>

                {/* <View style={reusbale.heightSpacer(20)} /> */}

                <PrimaryBtn
                  text={userAddress ? "Update" : "Add"}
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

export default Address;

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
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
