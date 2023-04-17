import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CheckoutLayout = ({ total, items }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <Text>{`(items: ${items})`}</Text>
                <Text style={styles.total}>{'Total: ₹' + total}</Text>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.checkoutbtn}
                  onPress ={()=>{
                    navigation.navigate('Checkout');
                  }} >
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>{'Checkout'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CheckoutLayout;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    tab: {
        width: '50%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },
    checkoutbtn: {
        width: '70%',
        height: '90%',
        backgroundColor: '#63368a',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    total: {
        fontSize: 18,
        fontWeight: '700'
    }
})