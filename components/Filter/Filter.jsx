import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { reusbale } from "../../constants/Style";
import Entypo from "@expo/vector-icons/Entypo";
import CustomDropdown from "../FormElemet/Dropdown";
import CustomSlider from "../FormElemet/Slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../../constants/Colors";
import PrimaryBtn from '../../components/primaryBtn';


const categories = [
    {
        id: 1,
        name: "Laptop",
    },
    {
        id: 2,
        name: "Office items",
    },
    {
        id: 3,
        name: "Smartphones",
    },
    {
        id: 4,
        name: "Tablets",
    },
    {
        id: 5,
        name: "Printers",
    },
    {
        id: 6,
        name: "Computer Accessories",
    },
    {
        id: 7,
        name: "Software",
    },
    {
        id: 8,
        name: "Networking Equipment",
    },
    {
        id: 9,
        name: "Home Appliances",
    }
];
const brands = [
    {
        id: 1,
        name: "Apple",
    },
    {
        id: 2,
        name: "Samsung",
    },
    {
        id: 3,
        name: "Dell",
    },
    {
        id: 4,
        name: "HP",
    },
    {
        id: 5,
        name: "Sony",
    },
    {
        id: 6,
        name: "Lenovo",
    },
    {
        id: 7,
        name: "Microsoft",
    },
    {
        id: 8,
        name: "Asus",
    },
    {
        id: 9,
        name: "Acer",
    },

];





const FilterComponent = forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ["85%"], []);
    const { dismiss } = useBottomSheetModal();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectBrand, setSelectBrand] = useState([]);

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior={"close"}
            />
        ),
        [dismiss]
    );

    const handleCategory = (id) => {

        selectedCategory === id ? setSelectedCategory(null) : setSelectedCategory(id)
    }

    const handleBrand = (id) => {

        const exestingBrand = selectBrand.find((brand) => brand === id);

        if (exestingBrand) {
            setSelectBrand(selectBrand.filter((brand) => brand != id))
        } else {
            setSelectBrand([...selectBrand, id])
        }


    }

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: "#f5f5f5" }}
            backdropComponent={renderBackdrop}
        >

            <BottomSheetScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.container}>
                    <View style={styles.sortContainer}>
                        <Text style={{ fontWeight: "500", fontSize: 16, flex: 1 }}>Sort By</Text>

                        <View style={styles.row}>
                            <CustomDropdown />
                            <Entypo name="chevron-down" size={24} />
                        </View>

                    </View>

                    <View style={reusbale.heightSpacer(10)} />

                    <Text style={styles.filterTitle}> Price Range</Text>
                    <CustomSlider />
                    <View style={reusbale.heightSpacer(25)} />

                    <Text style={styles.filterTitle}>Categories</Text>

                    <View style={reusbale.heightSpacer(10)} />

                    <View style={styles.categoryList}>

                        {categories.map((category, index) => <TouchableOpacity activeOpacity={1} key={category.id} style={[styles.catgeoryBtn, { backgroundColor: selectedCategory === category.id ? COLOR.primary : "transparent", borderColor: selectedCategory === category.id ? "transparent" : COLOR.darkGrey }]} onPress={() => handleCategory(category.id)}>

                            <Text numberOfLines={1} style={{ color: selectedCategory === category.id ? "#fff" : "black", fontWeight: selectedCategory === category.id ? "500" : "400" }}>{category.name}</Text>

                        </TouchableOpacity>)}


                    </View>

                    <View style={reusbale.heightSpacer(25)} />

                    <Text style={styles.filterTitle}>Brands</Text>
                    <View style={reusbale.heightSpacer(10)} />

                    <View style={styles.categoryList}>

                        {brands.map((brand, index) =>

                            <TouchableOpacity activeOpacity={1} key={brand.id} style={[styles.catgeoryBtn,

                            { backgroundColor: selectBrand.some(b => b === brand.id) ? COLOR.primary : "transparent", borderColor: selectBrand.some(b => b === brand.id ? "transparent" : COLOR.darkGrey) }]}

                                onPress={() => handleBrand(brand.id)}>


                                <Text numberOfLines={1} style={{ color: selectBrand.some(b => b === brand.id) ? "#fff" : "black", fontWeight: selectBrand.some(b => b === brand.id) ? "500" : "400" }}>{brand.name}</Text>

                            </TouchableOpacity>)}
                    </View>


                    <View style={reusbale.heightSpacer(40)} />

                    <PrimaryBtn text={"Apply Filter"} onPress={() => { }} />
                    <View style={reusbale.heightSpacer(20)} />


                </View>

            </BottomSheetScrollView>


        </BottomSheetModal>
    );
});

export default FilterComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    sortContainer: {
        flexDirection: "row",
        // justifyContent: "space-between",
        marginTop: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: COLOR.grey,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        alignItems: "center",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    filterTitle: {
        fontSize: 16, fontWeight: "500"
    },
    categoryList: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap"
    },

    catgeoryBtn: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.darkGrey,
        // padding: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7
    }
});
