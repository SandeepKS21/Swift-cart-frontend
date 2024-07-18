import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  userData,
  userSliceLoading,
} from "../../../slice/User/UserSlice";
import Loader from "../../../components/Loader";
import BottomSheetComponent from "../../../components/BottomSheetComponent";

const initialImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfsDuqpnkGagMBi1gBffCvQ35v-79LOHNSmUUcJM_w&s";

const profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(userData);
  const loading = useSelector(userSliceLoading);

  const [image, setImage] = useState(user?.image || initialImg);

  // select image
  const pickImage = async () => {
    // No need to manually ask for permission with expo-image-picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "User Profile",
    });
  }, []);

  useEffect(() => {
   
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (user?.image) {
      setImage(user.image);
    }
  }, [user]);

  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <BottomSheetComponent
        ref={bottomSheetRef}
        address={user.address}
        loading={loading}
      />

      <View style={styles.container}>
        <View style={styles.userDetailsContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image style={styles.image} source={{ uri: image }} />

            <AntDesign
              name="camera"
              size={17}
              color={"#fff"}
              style={styles.imageBadge}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", fontSize: 25 }}>{user?.name}</Text>

          <View style={styles.spendDetailsContainer}>
            <View style={styles.userSubDetails}>
              <Text style={styles.userSubDetailsText}>42</Text>
              <Text style={styles.userSubDetailsTextDesc}>Orders</Text>
            </View>
            <View style={styles.userSubDetails}>
              <Text style={styles.userSubDetailsText}>5</Text>
              <Text style={styles.userSubDetailsTextDesc}>Saved</Text>
            </View>
            <View style={styles.userSubDetails}>
              <Text style={styles.userSubDetailsText}>1,200</Text>
              <Text style={styles.userSubDetailsTextDesc}>Spent</Text>
            </View>
          </View>
        </View>

        <View style={reusbale.heightSpacer(40)} />

        <View style={styles.sectionList}>
          <Text style={{ color: COLOR.grey }}>Mobile Number</Text>
          <Text style={{ fontWeight: "500", fontSize: 18, paddingVertical: 7 }}>
            {user?.mobile}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={openBottomSheet}
          style={[
            styles.sectionList,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View>
            <Text style={{ color: COLOR.grey }}>Address</Text>
            <Text style={{ fontWeight: "500", fontSize: 18, paddingBottom: 7 }}>
              {user?.address?.[0]?.address}
            </Text>
          </View>
          <Entypo name="chevron-right" size={24} />
        </TouchableOpacity>

        <View style={styles.sectionList}>
          <Text style={{ color: COLOR.grey }}>Email</Text>
          <Text style={{ fontWeight: "500", fontSize: 18, paddingBottom: 7 }}>
            {user?.email}
          </Text>
        </View>

        <View
          style={[
            styles.sectionList,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={{ paddingBottom: 7, fontWeight: "500", fontSize: 18 }}>
            Change Password
          </Text>
          <Entypo name="chevron-right" size={24} />
        </View>

        <View
          style={[
            styles.sectionList,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={{ paddingBottom: 7, fontWeight: "500", fontSize: 18 }}>
            Select Default Payment Card
          </Text>

          <Entypo name="chevron-right" size={24} />
        </View>
      </View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  userDetailsContainer: {
    alignItems: "center",
    gap: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },

  spendDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
  },

  userSubDetails: {
    alignItems: "center",
  },

  userSubDetailsText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userSubDetailsTextDesc: {
    color: COLOR.grey,
    fontWeight: "500",
    fontSize: 14,
  },

  imageBadge: {
    backgroundColor: COLOR.primary,
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 7,
  },

  sectionList: {
    alignItems: "flex-start",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLOR.mediumGrey,
    justifyContent: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
