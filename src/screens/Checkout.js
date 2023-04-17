import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, emptyCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice'
import CustomButton from '../common/CustomButton'
import { ScrollView } from 'react-native-virtualized-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RazorpayCheckout from 'react-native-razorpay';
import { orderItem } from '../redux/slices/OrderSlice'

const Checkout = () => {
    const navigation = useNavigation();
    const items = useSelector(state => state.cart);
    // console.log(JSON.stringify(items)+" "+ items.data.length);
    const [cartItems, setCartItems] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(0);
    const [selectAddress, setselectAddress] = useState('Please Select Address...')
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    // Date and Time
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    console.log(formatted_date)

    useEffect(() => {
        setCartItems(items.data);
    }, [items]);

    const getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + item.qty * item.price;
        })
        return total.toFixed(0);
    }

    useEffect(() => {
        getSelectedAddress();
    }, [isFocused]);
    const getSelectedAddress = async () => {
        setselectAddress(await AsyncStorage.getItem('MY_ADDRESS'));
    }

    const orderPlace = paymentId => {
        const data = {
            items: cartItems,
            amount: '₹' + getTotal(),
            address: selectAddress,
            paymentId: paymentId,
            paymentStatus: selectedMethod == 3 ? 'Pending' : 'Succesfully',
            date: formatted_date,
        };
        navigation.navigate('OrderSucces');
        dispatch(orderItem(data));
        dispatch(emptyCart());
        
    }
    //Payment using Razorpay
    const payNow = () => {
        var options = {
            description: 'Credits towards consultation',
          //  image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_WmopQrSuXOZ7dU', // Your api key
            amount: getTotal() * 100,
            name: 'foo',
            prefill: {
                email: 'void@razorpay.com',
                contact: '8250364969',
                name: 'Razorpay Software'
            },
            theme: { color: 'blue' }
        };
        RazorpayCheckout.open(options)
            .then((data) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                orderPlace(data.razorpay_payment_id);
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
    }
    return (
        <View style={styles.container}>
            <Header
                title={'Checkout'}
                leftIcon={require('../images/leftarrow.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }
                }
            />
            <ScrollView nestedScrollEnabled={false} >
                <Text style={styles.title}>Added Items</Text>
                <View>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.productItem}
                                    onPress={() => {
                                        navigation.navigate("ProductDetail", { data: item })
                                    }}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View>
                                        <Text style={styles.Title}>
                                            {item.title?.length > 25 ?
                                                item.title.substring(0, 25) + "..."
                                                : item.title}
                                        </Text>
                                        <Text style={styles.desc}>
                                            {item.description?.length > 30 ?
                                                item.description.substring(0, 30) + "..."
                                                : item.description}
                                        </Text>
                                        <View style={styles.qtyView}>
                                            <Text style={styles.price}> ₹ {item.price} </Text>
                                            <TouchableOpacity style={styles.btn} onPress={() => {
                                                if (item.qty > 1) {
                                                    dispatch(reduceItemFromCart(item));
                                                }
                                                else {
                                                    dispatch(removeItemFromCart(index));
                                                }
                                            }}>
                                                <Text style={{ fontSize: 15, fontWeight: '600' }}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.qty}>{item.qty}</Text>
                                            <TouchableOpacity style={styles.btn} onPress={() => dispatch(addItemToCart(item))}>
                                                <Text style={{ fontSize: 15, fontWeight: '600' }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <View style={styles.totalView}>
                    <Text style={styles.title}>Total</Text>
                    <Text style={[styles.title, { marginRight: 20 }]}>{'₹ ' + getTotal()}</Text>
                </View>
                <Text style={styles.title}>Select Payment Mode</Text>
                <TouchableOpacity style={styles.paymentMode}
                    onPress={() =>
                        setSelectedMethod(0)
                    }>
                    <Image source={
                        selectedMethod == 0 ?
                            require('../images/radio-fill.png') :
                            require('../images/radio.png')}
                        style={[styles.imageRadio, { tintColor: selectedMethod == 0 ? 'blue' : 'black' }]}
                    />
                    <Text style={styles.paymentTitle}>Credit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMode}
                    onPress={() =>
                        setSelectedMethod(1)
                    }>
                    <Image source={
                        selectedMethod == 1 ?
                            require('../images/radio-fill.png') :
                            require('../images/radio.png')}
                        style={[styles.imageRadio, { tintColor: selectedMethod == 1 ? 'blue' : 'black' }]}
                    />
                    <Text style={styles.paymentTitle}>Debit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMode}
                    onPress={() =>
                        setSelectedMethod(2)
                    }>
                    <Image source={
                        selectedMethod == 2 ?
                            require('../images/radio-fill.png') :
                            require('../images/radio.png')}
                        style={[styles.imageRadio, { tintColor: selectedMethod == 2 ? 'blue' : 'black' }]}
                    />
                    <Text style={styles.paymentTitle}>UPI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMode}
                    onPress={() =>
                        setSelectedMethod(3)
                    }>
                    <Image source={
                        selectedMethod == 3 ?
                            require('../images/radio-fill.png') :
                            require('../images/radio.png')}
                        style={[styles.imageRadio, { tintColor: selectedMethod == 3 ? 'blue' : 'black' }]} />
                    <Text style={styles.paymentTitle}>Cash On Delivery</Text>
                </TouchableOpacity>
                <View style={styles.addressView}>
                    <Text style={styles.title}>Address</Text>
                    <Text style={[styles.title, { textDecorationLine: 'underline', color: '#40E0D0' }]}
                        onPress={() => {
                            navigation.navigate('Addresses');
                        }} >Edit Address</Text>
                </View>

                <Text style={{ marginHorizontal: 15, fontSize: 16, fontWeight: '600', color: '#808080' }}>{selectAddress}</Text>
                <CustomButton
                    bg={'green'}
                    title={'Pay & Order'}
                    color={'#fff'}
                    onClick={() => {
                        if(selectedMethod == 3){
                            Alert.alert('Order Placed..')
                            orderPlace();
                        }
                        else{
                            payNow();
                        }

                    }} />
            </ScrollView>
        </View>
    )
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        padding: 15,
        color: '#000'
    },
    productItem: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    Title: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 20
    },
    desc: {
        marginLeft: 20,
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
        color: 'green',
        marginLeft: 20,
        marginTop: 5
    },
    qtyView: {
        flexDirection: 'row',
        marginTop: 10,
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
    },
    noItems: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //  alignSelf:'center'
    },
    noItemsTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 2
    },
    totalView: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: .3,
        borderBottomColor: '#343'
    },
    paymentMode: {
        width: '90%',
        marginTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageRadio: {
        width: 24,
        height: 24,
    },
    paymentTitle: {
        color: '#000',
        marginLeft: 15,
        fontSize: 18,
    },
    addressView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,

    }
})