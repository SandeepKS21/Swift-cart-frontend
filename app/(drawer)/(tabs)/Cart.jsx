import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBarComponent from "../../../components/SearchBarComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLOR } from "../../../constants/Colors";
import { reusbale } from "../../../constants/Style";
import CartItemList from "../../../components/CartItemList";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartErrror,
  cartLoading,
  cartSubTotal,
  getCartItem,
  removeAndUpdateCart,
  removeCartItem,
  resetCartMsg,
  updateCartQuantity,
} from "../../../slice/Cart/CartSlice";
import Loader from "../../../components/Loader";
import { showToast } from "../../../utils/comman";
import { Link } from "expo-router";
import TransparentLoader from "../../../components/Loader/TransparentLoader";
import { formatNumberIndian } from "./../../../utils/comman";

const Cart = () => {
  const navigation = useNavigation();

  const [newCartData, setNewCartData] = useState([]);

  const dispatch = useDispatch();
  const cart = useSelector(cartData);
  const subTotal = useSelector(cartSubTotal);
  const loading = useSelector(cartLoading);
  const cartErrMsg = useSelector(cartErrror);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCartItem());
    }, [])
  );
  useLayoutEffect(() => {
    const cartLength = newCartData.length;
    navigation.setOptions({
      headerTitle: "Cart",

      headerRight: () =>
        cartLength > 0 ? (
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              paddingRight: 15,
            }}
          >
            Subtotal <Text>₹{formatNumberIndian(subTotal)}</Text>
          </Text>
        ) : null,
    });
  }, [subTotal,newCartData.length]);

  // useEffect(() => {
  //   dispatch(getCartItem());
  // }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const updatedCart = cart.map((item) => {
        return { ...item, isOpen: false };
      });

      setNewCartData(updatedCart);
    }
  }, [cart]);

  const openComponent = (index) => {
    const newCart = newCartData.map((item) => ({
      ...item,
      isOpen: item.id === index,
    }));
    setNewCartData(newCart);
  };

  const handleRemoveCart = (id) => {
    dispatch(removeAndUpdateCart(id));
  };

  const handleAddFavorite = (id) => {
    console.log("favorite", id);
  };

  useEffect(() => {
    if (cartErrMsg) {
      showToast('Some thing went wrong', (typpe = "error"));
      dispatch(resetCartMsg());
      return;
    }
  }, [cartErrMsg]);

  // const ld=true;
  // loading

  // if (loading.getItem) {
  //   return (
  //     <View
  //       style={{
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flex: 1,
  //         backgroundColor: "#fff",
  //       }}
  //     >
  //       <Loader />
  //     </View>
  //   );
  // }

  const handleProductQuantity = (cartId, updatedQuantity, currentQuantity) => {
    // console.log("currentQuantity", currentQuantity);

    const productQuantity = currentQuantity + updatedQuantity;

    if (productQuantity >= 1) {
      // console.log("productQuantity", productQuantity);
      dispatch(updateCartQuantity({ cartId, productQuantity }));
    } else {
      handleRemoveCart(cartId);
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        {(loading.updateItem || loading.removeItem) && (
          <TransparentLoader loading={true} />
        )}

        {cart.length > 0 ? (
          <View style={styles.container}>
            <View style={reusbale.heightSpacer(10)} />

            <FlatList
              scrollEnabled={false}
              data={newCartData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CartItemList
                  item={item}
                  oncomponentOpen={(x) => {
                    openComponent(x);
                  }}
                  removeCart={(x) => {
                    handleRemoveCart(x);
                  }}
                  addFavorite={(x) => {
                    handleAddFavorite(x);
                  }}
                  handleProductQuantity={handleProductQuantity}
                />
              )}
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>No item found</Text>
          </View>
        )}
      </ScrollView>

      {cart.length > 0 ? (
        <Link
          href={"/screen/checkout/Checkout"}
          style={styles.cartCount}
          asChild
        >
          <TouchableOpacity activeOpacity={0.8}>
            <Feather name="shopping-bag" size={27} color={"#fff"} />
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
              proceed to checkout
            </Text>
          </TouchableOpacity>
        </Link>
      ) : null}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 15,
  },

  searchConatiner: {
    backgroundColor: "#fff",
    height: 70,
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  cartCount: {
    position: "absolute",
    backgroundColor: COLOR.primary,
    bottom: 20,
    right: 90,
    left: 90,
    flexDirection: "row",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
