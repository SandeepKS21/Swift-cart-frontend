import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const reusbale = StyleSheet.create({
  heightSpacer: (height) => ({
    height: moderateScale(height),
    // height: height,
  }),
});

// response height & width

export const rW = (width) => {
  return scale(width);
};

export const rH = (height) => {
  return verticalScale(height);
};

export const mScale = (scale, factor = 0.5) => {
  return moderateScale(scale, factor);
};
