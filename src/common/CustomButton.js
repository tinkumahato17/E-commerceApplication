import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const CustomButton = ({ title, bg, color, onClick }) => {
    return (
        <TouchableOpacity
            style={[styles.btn, { backgroundColor: bg }]}
            onPress={() => {onClick(); }}
        >
            <Text style={{ color: color, fontSize: 18, fontWeight: '500' }} >{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    btn: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 10
    }
})