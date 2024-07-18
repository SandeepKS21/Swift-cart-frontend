import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import ImageView from "react-native-image-viewing";
import { rH } from "../constants/Style";

const CarouselComponent = ({
  itemDetails,
  handleImageZoom,
  imageZoomIndex,
  visible,
  SetCarouselIndex,
  setIsVisible,
}) => {
  const width = Dimensions.get("window").width;

  return (
    <Carousel
      windowSize={1}
      width={width}
      // height={width / 1.4}
      height={rH(220)}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 30,
      }}
      // autoPlay={true}
      data={itemDetails.images}
      // scrollAnimationDuration={2000}
      onSnapToItem={(index) => SetCarouselIndex(index)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => handleImageZoom(index)}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={{ uri: item }}
        /> */}
          <Image style={{ flex: 1, resizeMode: "contain" }} source={item} />

          <ImageView
            images={itemDetails.images}
            imageIndex={imageZoomIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({});
