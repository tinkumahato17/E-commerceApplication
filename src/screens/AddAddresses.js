import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../common/Header';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddresses = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();

    const [type, setType] = useState(route.params.type == 'edit' ? route.params.data.type == 'Home' ? 1 : 2 : '');
    const [state, setState] = useState(route.params.type == 'edit' ? route.params.data.state : '');
    const [city, setCity] = useState(route.params.type == 'edit' ? route.params.data.city : '');
    const [pin, setPin] = useState(route.params.type == 'edit' ? route.params.data.pin : '');
    return (
        <View style={styles.container}>
            <Header
                title={route.params.type == 'edit' ? 'Edit Address' : 'Add Address'}
                leftIcon={require('../images/leftarrow.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }} />
            <TextInput
                style={[styles.input, { marginTop: 50 }]}
                placeholder={'Enter the State'}
                value={state}
                onChangeText={txt => setState(txt)}
            />
            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                placeholder={'Enter the City'}
                value={city}
                onChangeText={txt => setCity(txt)}
            />
            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                keyboardType={'number-pad'}
                placeholder={'Enter the Pin'}
                value={pin}
                onChangeText={txt => setPin(txt)}
            />
            <View style={styles.typeView}>
                <TouchableOpacity
                    style={[styles.typeBtn, { borderColor: type == 1 ? 'orange' : 'black' }]}
                    onPress={() => {
                        setType(1);
                    }}
                >
                    <Image
                        source={
                            type == 1 ? require('../images/radio-fill.png') : require('../images/radio.png')}
                        style={styles.radio}
                    />
                    <Text style={styles.radioText}>{'Home'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeBtn, { borderColor: type == 2 ? 'orange' : 'black' }]}
                    onPress={() => {
                        setType(2);
                    }}
                >
                    <Image
                        source={
                            type == 2 ? require('../images/radio-fill.png') : require('../images/radio.png')}
                        style={styles.radio}
                    />
                    <Text style={styles.radioText}>{'Office'}</Text>
                </TouchableOpacity>
            </View>
            <CustomButton
                bg={'green'}
                title={'Save Address'}
                color="#fff"
                onClick={() => {

                    if (route.params.type == 'edit') {
                        dispatch(updateAddress({
                            state: state,
                            city: city,
                            pin: pin,
                            type: type == 1 ? 'Home' : 'Office',
                            id: route.params.data.id,
                        }),
                            navigation.goBack(),
                        );
                    }
                    else {
                        dispatch(addAddress({
                            state: state,
                            city: city,
                            pin: pin,
                            type: type == 1 ? 'Home' : 'Office',
                            id: uuid.v4(),
                        }),
                            navigation.goBack(),
                        );
                    }

                }}
            />

        </View>
    )
}

export default AddAddresses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 15,
        borderWidth: 0.3,
        alignSelf: 'center',
        paddingLeft: 20,

    },
    typeView: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    typeBtn: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        borderWidth: 0.5,
        alignItems: 'center'
    },
    radio: {
        width: 24,
        height: 24,

    },
    radioText: {
        marginLeft: 10
    }

})