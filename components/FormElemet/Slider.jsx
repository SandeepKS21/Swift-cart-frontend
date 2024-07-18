import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Slider } from '@miblanchard/react-native-slider';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLOR } from '../../constants/Colors';

const CustomSlider = () => {

    const [range, setRange] = useState([0, 10000]);


    return (
        <View style={styles.container}>
            <Slider
                value={range}
                onValueChange={value => setRange(value)}
                animateTransitions={true}
                animationType="spring"
                minimumValue={0}
                maximumValue={20000}
                maximumTrackTintColor={COLOR.mediumGrey}
                minimumTrackTintColor='red'
                renderThumbComponent={() => <FontAwesome name="circle" size={22} color={COLOR.primary} />}
                step={500}
                allowTouchTrack={true}


            />
            {/* <Text>Value: {range}</Text> */}
            <Text style={{ fontWeight: "500" }}>{range[0]} to {range[1]}</Text>
        </View>
    )
}

export default CustomSlider

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',

    },
})