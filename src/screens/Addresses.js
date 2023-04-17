import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAddress } from '../redux/slices/AddressSlice';

const Addresses = () => {
    const navigation = useNavigation();
    const addressList = useSelector(state => state.address);
    const dispatch = useDispatch();

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(addressList);
    }, [isFocused])

    const defaultAddress = async item => {
        await AsyncStorage.setItem(
            'MY_ADDRESS', 'City: ' + item.city + ', State:' + item.state +'\n'+ 'Pin:' + item.pin + ',' + ' Type:' + item.type,
        );
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Header
                title={'My Address'}
                leftIcon={require('../images/leftarrow.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }} />

            <FlatList
                data={addressList.data}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={styles.addressContainer}
                            onPress={() => {
                                defaultAddress(item)
                            }}>

                            <Text style={styles.textStyle}>{`State: ${item.state}`}</Text>
                            <Text style={styles.textStyle}>{`City: ${item.city}`}</Text>
                            <Text style={styles.textStyle}>{`Pin: ${item.pin}`}</Text>
                            <Text style={[styles.textStyle, {
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                backgroundColor: '#C6E2FF',
                                padding: 5,
                                borderRadius: 10,
                                fontSize: 12
                            }]}>{item.type}</Text>
                            <View style={styles.bottomView}>
                                <TouchableOpacity
                                    style={{ marginRight: 20 }}
                                    onPress={() => {
                                        navigation.navigate('AddAddresses', {
                                            type: 'edit',
                                            data: item,
                                        });
                                    }}
                                >
                                    <Image source={require('../images/edit.png')} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    dispatch(deleteAddress(item.id));
                                }}>
                                    <Image source={require('../images/delete.png')} style={styles.imgStyle} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            <TouchableOpacity style={styles.addBotton} onPress={() => {
                navigation.navigate('AddAddresses', { type: 'new' });
            }}>
                <Text style={{ fontSize: 30, color: '#fff' }}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Addresses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addBotton: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 25,
        bottom: 50,
        right: 20,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    addressContainer: {
        width: '90%',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 20,
        paddingLeft: 15,
        paddingVertical: 10

    },
    bottomView: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    imgStyle: {
        width: 24,
        height: 24,
    }
})