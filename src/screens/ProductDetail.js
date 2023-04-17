import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../common/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../common/CustomButton'
import { useDispatch } from 'react-redux'
import { addItemToWishList } from '../redux/slices/WishlistSlice'
import { addItemToCart } from '../redux/slices/CartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AskForLoginModal from '../common/AskForLoginModal'

const ProductDetail = () => {
   const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const checkUserStatus = async () => {
        let isUserLogedIn = false;
        const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
        if (status == null) {
            isUserLogedIn = false;
        }
        else {
            isUserLogedIn = true;
        }
        console.log(isUserLogedIn);
        return isUserLogedIn;
    }

    return (
        <View style={styles.container}>
            <Header
                leftIcon={require('../images/leftarrow.png')}
                rightIcon={require('../images/cart1.png')}
                title={'Product Detail'}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }}
                isCart={true}
            />
            <ScrollView style={{ marginTop: 10 }}>
                <Image source={{ uri: route.params.data.image }} style={styles.ProductBanner} />
                <Text style={styles.title}>{route.params.data.title}</Text>
                <Text style={styles.dec}>{route.params.data.description}</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={[styles.price, { color: '#000' }]}>{'Price:'}</Text>
                    <Text style={styles.price}>{"₹" + route.params.data.price}</Text>
                    <View style={styles.qtyView}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                if (qty > 1) {
                                    setQty(qty - 1);
                                }
                            }}>
                            <Text style={{ fontSize: 15, fontWeight: '600' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qty}>{qty}</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                setQty(qty + 1);
                            }}>
                            <Text style={{ fontSize: 15, fontWeight: '600' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.wishlistBtn}
                    onPress={() => {
                        if (checkUserStatus() === true) {
                            dispatch(addItemToWishList(route.params.data));
                        }
                        else {
                            setModalVisible(true);
                        }
                    }}>
                    <Image source={require('../images/heart1.png')} style={styles.wishlistIcon} />
                </TouchableOpacity>
                <CustomButton
                    bg={"blue"}
                    title={'Add To Cart'}
                    color={'#fff'}
                    onClick={() => {
                        //        console.log(route.params.data);
                        if (checkUserStatus()) {
                            dispatch(addItemToCart({
                                id: route.params.data.id,
                                title: route.params.data.title,
                                price: route.params.data.price,
                                description: route.params.data.description,
                                category: route.params.data.category,
                                qty: qty,
                                rating: route.params.data.rating,
                                image: route.params.data.image,
                            }),
                            );
                        }
                        else {
                            setModalVisible(true);
                        }
                    }} />
            </ScrollView>
            <AskForLoginModal
                modalVisible={modalVisible}
                onClickLogin={() => {
                    setModalVisible(false)
                    navigation.navigate('Login')
                }}
                onClickSignup={() => {
                    setModalVisible(false)
                    navigation.navigate('Signup')
                }}
                onClose={() => {
                    setModalVisible(false)
                }} />
        </View>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"

    },
    ProductBanner: {
        width: "100%",
        height: 250,
        resizeMode: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 20
    },
    dec: {
        fontSize: 15,
        marginHorizontal: 20,
        marginTop: 10,
    },
    price:
    {
        fontSize: 25,
        fontWeight: '700',
        color: 'green',
        marginLeft: 20,
        marginTop: 20
    },
    wishlistBtn: {
        position: 'absolute',
        right: 20,
        top: 100,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    wishlistIcon: {
        width: 24,
        height: 24,
    },
    qtyView: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30
    },
    btn: {
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        width: 30,
        marginLeft: 10
    },
    qty: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10
    }

})