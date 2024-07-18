import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Loader from "../../../components/Loader";
import PrimaryBtn from "./../../../components/primaryBtn";
import { useRouter } from "expo-router";

const PickLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        coords: {
          ...location.coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    })();
  }, []);

  const handleSelectedLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // here we will get slected location name from  lat,long using google api

    setSelectedLocation({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const submitLocation = () => {
    route.replace({ pathname: "(drawer)/(tabs)" });
  };

  useEffect(() => {
    if (errorMsg) {
      alert(errorMsg);
    }

    return () => {
      setErrorMsg(null);
    };
  }, [errorMsg]);

  if (!location) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleSelectedLocation}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        provider="google"
        loadingEnabled={true}
      >
        <Marker
          // coordinate={{
          //   latitude: selectedLocation.latitude,
          //   longitude: selectedLocation.longitude,
          // }}
          coordinate={{
            latitude: selectedLocation
              ? selectedLocation.latitude
              : location.coords.latitude,
            longitude: selectedLocation
              ? selectedLocation.longitude
              : location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>

      <View
        style={{
          position: "absolute",
          width: "70%",
          left: 60,
          right: 0,
          bottom: 50,
        }}
      >
        <PrimaryBtn text={"Select"} onPress={submitLocation} />
      </View>
    </View>
  );
};

export default PickLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
