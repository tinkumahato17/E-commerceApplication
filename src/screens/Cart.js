import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { addItemToCart, reduceItemFromCart, removeItemFromCart, } from '../redux/slices/CartSlice';
import CheckoutLayout from '../common/CheckoutLayout';

const Cart = () => {

    // const {height,width} = Dimensions.get('window').width;
    const navigation = useNavigation();
    const items = useSelector(state => state.cart);
    // console.log(JSON.stringify(items)+" "+ items.data.length);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();

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
    return (
        <View style={styles.container}>
            <Header title={"Cart Items"} leftIcon={require('../images/leftarrow.png')}/>
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
            {/* {cartItems.length<1 && (<View style={styles.noItems}>
               <Text style={styles.noItemsTitle}>No Items in Cart</Text>

            </View>)} */}
            {/* {cartItems.length>0 &&(
             <CheckoutLayout items={cartItems.length} total={getTotal()}/>
           )} */}
            <CheckoutLayout items={cartItems.length} total={getTotal()} />
        </View>
    )
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
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
    }
})