import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { COLOR } from "../../../constants/Colors";
import { mScale, reusbale, rW } from "../../../constants/Style";
import { TouchableOpacity } from "react-native";
import PrimaryBtn from "../../../components/primaryBtn";
import RelatedProduct from "../../../components/RelatedProduct";
import ReadMore from "@fawazahmed/react-native-read-more";
import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  productDetail,
  productError,
  resetProduct,
} from "../../../slice/Product/productSlice";
import Loader from "../../../components/Loader";
import { readItem } from "../../../utils/localStorage";
import CarouselComponent from "../../../components/CarouselComponent";
import {
  addToCartAndGetCartItem,
  cartLoading,
  cartProductCount,
  cartSucessMsg,
  getCartItem,
  resetCartMsg,
} from "../../../slice/Cart/CartSlice";
import { formatNumberIndian, notifier, showToast } from "../../../utils/comman";
import CartWithCount from "../../../components/Icons/CartWithCount";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const route = useRouter();

  const [itemDetails, setItemDetails] = useState(null);
  const [carouselIndex, SetCarouselIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [imageZoomIndex, setImageZoomIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [token, SetToken] = useState(null);

  const dispatch = useDispatch();
  const product = useSelector(productDetail);
  const error = useSelector(productError);
  const addToCartMsg = useSelector(cartSucessMsg);
  const cartCount = useSelector(cartProductCount);
  const addCartLoad = useSelector(cartLoading);

  useEffect(() => {
    setItemDetails(null);
    dispatch(getProductById(id));
    dispatch(getCartItem());
    setQuantity(1);
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      const productData = {
        ...product,
        images: product.images.map((uri) => ({ uri })),
      };
      setItemDetails(productData);
    }
  }, [product]);

  useEffect(() => {
    setItemDetails(null);

    const getToken = async () => {
      const token = await readItem("token");
      SetToken(token);
    };
    getToken();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      //   headerTransparent: true
      headerShadowVisible: false,

      headerRight: () => <CartWithCount cartCount={cartCount} />,
      headerLeft: () => (
        <Link href={"/"} asChild>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignItems: "center",
              // justifyContent: "center",
              width: 30,
              borderRadius: 20,
            }}
          >
            <FontAwesome name="angle-left" size={30} />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [cartCount]);

  const handleImageZoom = useCallback((index) => {
    setIsVisible(true);
    setImageZoomIndex(index);
  }, []);

  const refresh = () => {
    dispatch(getProductById(id));
  };

  useEffect(() => {
    if (addToCartMsg) {
      // notifier(addToCartMsg, (typpe = "success"));
      showToast(addToCartMsg, (typpe = "success"));

      dispatch(resetCartMsg());
      dispatch(getCartItem());
      refresh();
    }
  }, [addToCartMsg]);

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!itemDetails) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const renderPagination = () => {
    return (
      <View style={{ flexDirection: "row", gap: 5 }}>
        {itemDetails.images.map((item, index) => (
          <View key={index}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    carouselIndex === index ? "black" : COLOR.mediumGrey,
                },
              ]}
            ></View>
          </View>
        ))}
      </View>
    );
  };

  const handleProductQuantity = (count) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + count;

      return newQuantity >= 5 ? 5 : newQuantity >= 1 ? newQuantity : 1;
    });
  };

  const handleAddToCart = (cartBody) => {
    dispatch(addToCartAndGetCartItem(cartBody));
  };

  // console.log(product)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <Animated.View style={styles.container} entering={FadeInRight}>
        <View style={styles.carouselContainer}>
          <CarouselComponent
            itemDetails={itemDetails}
            handleImageZoom={handleImageZoom}
            imageZoomIndex={imageZoomIndex}
            setIsVisible={setIsVisible}
            visible={visible}
            SetCarouselIndex={SetCarouselIndex}
          />

          {renderPagination()}
        </View>

        <View style={reusbale.heightSpacer(10)} />

        <Animated.View
          style={styles.productNameContainer}
          entering={FadeInUp.delay(100)}
        >
          <Text
            numberOfLines={2}
            style={[styles.productName, { width: rW(220) }]}
          >
            {itemDetails.name}
          </Text>
          <Text numberOfLines={1} style={styles.productName}>
            ₹{formatNumberIndian(itemDetails.discountPrice)}
          </Text>
        </Animated.View>

        <View style={reusbale.heightSpacer(20)} />

        <Animated.View
          style={styles.productRowDetails}
          entering={FadeInUp.delay(100)}
        >
          {itemDetails?.weight && (
            <Text style={{ fontSize: mScale(15), color: COLOR.darkGrey }}>
              Weight:{" "}
              <Text style={{ fontWeight: "600", color: "black" }}>
                {itemDetails.weight}
              </Text>
            </Text>
          )}

          <View style={styles.productQuantity}>
            <TouchableOpacity
              style={styles.cartQuantityBtn}
              onPress={() => handleProductQuantity(-1)}
            >
              <FontAwesome6
                name="minus"
                size={mScale(17)}
                color={COLOR.primary}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.primaryColor,
                { fontSize: mScale(17), fontWeight: "bold" },
              ]}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              style={styles.cartQuantityBtn}
              onPress={() => handleProductQuantity(+1)}
            >
              <FontAwesome6
                name="plus"
                size={mScale(17)}
                color={COLOR.primary}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={reusbale.heightSpacer(20)} />
        <Animated.Text
          entering={FadeInUp.delay(200)}
          style={styles.headerTitle}
        >
          Description
        </Animated.Text>

        <View style={reusbale.heightSpacer(5)} />

        <Animated.View entering={FadeInUp.delay(200)}>
          <ReadMore
            numberOfLines={3}
            style={{
              fontSize: mScale(13),
              color: COLOR.darkGrey,
              lineHeight: 20,
            }}
          >
            {itemDetails.description}
          </ReadMore>
        </Animated.View>

        {/* <Text
          numberOfLines={4}
          style={{ fontSize: 14, color: COLOR.darkGrey, lineHeight: 20 }}
        >
          {productDetails.description}
          
        </Text> */}

        <View style={reusbale.heightSpacer(20)} />
        <Animated.Text
          entering={FadeInUp.delay(200)}
          style={styles.headerTitle}
        >
          Related product
        </Animated.Text>
        <View style={reusbale.heightSpacer(5)} />

        {itemDetails?.relatedProduct && (
          <Animated.FlatList
            entering={FadeInUp.delay(100)}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={itemDetails?.relatedProduct}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <RelatedProduct product={item} />}
          />
        )}

        <View style={reusbale.heightSpacer(20)} />

        {itemDetails.isCart ? (
          <PrimaryBtn
            loading={addCartLoad.addItem}
            text={"View in cart"}
            onPress={() => {
              route.navigate("Cart");
            }}
          />
        ) : (
          <PrimaryBtn
            loading={addCartLoad.addItem}
            text={"Add to cart"}
            onPress={() => {
              if (token) {
                handleAddToCart({
                  product: itemDetails._id,
                  quantity: quantity,
                  token,
                });
              } else {
                navigation.replace("screen/auth/sendOtp");
              }
            }}
          />
        )}

        <View style={reusbale.heightSpacer(20)} />
      </Animated.View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    alignItems: "center",
    flex: 1,
  },

  productNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 9,
  },

  productName: {
    fontSize: mScale(16),
    fontWeight: "bold",
  },
  productRowDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productQuantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },

  cartQuantityBtn: {
    backgroundColor: COLOR.btnColor,
    padding: mScale(5),
    alignItems: "center",
    borderRadius: 7,
  },

  primaryColor: {
    color: COLOR.primary,
  },

  headerTitle: {
    fontWeight: "bold",
    fontSize: mScale(16),
  },

  dot: {
    height: mScale(7),
    width: mScale(7),
    borderRadius: 50,
    backgroundColor: "black",
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  retryBtn: {
    borderRadius: 7,
    backgroundColor: COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    marginTop: mScale(15),
  },
});
