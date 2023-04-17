import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Orders = ({ navigation }) => {

    const orderList = useSelector(state => state.order);
    console.log(orderList);
    
    return (
        <View style={styles.container}>
            <Header
                title={'Orders'}
                leftIcon={require('../images/leftarrow.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }}
            />
            <FlatList
                data={orderList.data}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.orderItem}>
                            <FlatList
                                data={item.items}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.productItem}>
                                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                                            <View style={styles.name}>
                                                <Text style={styles.titleStyle}>
                                                    {item.title.length > 20 ? item.title.substring(0, 20) : item.title}
                                                </Text>
                                                <Text style={styles.descStyle}>
                                                    {item.description.length > 20 ? item.description.substring(0, 40) : item.description}
                                                </Text>
                                                <Text style={styles.priceStyle}>
                                                    {'₹ ' + item.price}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }} />
                        </View>
                    )
                }}

            />
        </View>
    )
}

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    orderItem: {
        width: "90%",
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        borderWidth:.5,
        borderRadius:5,
        alignItems:'center',
        padding:5
    },
    productItem: {
        width: '95%',

        alignSelf: 'center',
        flexDirection: 'row'
    },
    itemImage: {
        width: 50,
        height: 50,
        resizeMode:'contain'
    },
    name: {
        marginLeft: 15,
        marginRight: 10
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600'
    },
    descStyle: {
        fontSize: 14,
        fontWeight: '400'
    },
    priceStyle: {
        fontSize: 18,
        fontWeight: '600',
        color:'green'
    }
})