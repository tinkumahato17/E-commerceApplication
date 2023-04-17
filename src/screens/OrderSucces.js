import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderSucces = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../images/valid.png')} style={styles.img} />
            <Text style={styles.msg}>Order Placed Succesfully...</Text>
            <Text style={styles.btn}
             onPress={()=>{
                navigation.navigate('Main');
             }}
            >Go To Home</Text>
        </View>
    )
}

export default OrderSucces;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 100,
    },
    msg: {
        marginVertical: 20,
        fontSize: 18,
        color: '#000',
        fontWeight:'600'
        
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        color: '#000',
        fontWeight:'600',
        fontSize:16
    }
})