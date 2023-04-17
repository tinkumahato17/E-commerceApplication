import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
const Header = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickrightIcon ,isCart}) => {
    const cartItems = useSelector(state => state.cart);
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.btn}
                onPress={() => {
                    onClickLeftIcon();
                }}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {!isCart && <View></View>}
          {isCart &&(
              <TouchableOpacity style={styles.btn} onPress ={()=>navigation.navigate('Cart')}>
              <Image source={rightIcon} style={styles.icon} />
              <View style={ styles.addItems}>
                  <Text style={{ color: '#000' }}>
                      {cartItems.data.length}
                  </Text>
              </View>
          </TouchableOpacity>
          )}
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        backgroundColor: '#0786DAFD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 25,
        width: 25,
        tintColor: '#fff'
    },
    title: {
        color: "#fff",
        fontSize: 20,
    },
    addItems: {
        width: 20,
        height: 20,
        position: 'absolute',
        borderRadius: 10,
        backgroundColor: '#fff',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})