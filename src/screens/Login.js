import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../common/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addItemToCart } from '../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
   const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const route = useRoute();
    const dispatch = useDispatch();
    const loginUser = () => {
        firestore()
            .collection('Users')
            // Filter results
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                /* ... */
                console.log(querySnapshot.docs[0]._data.pass);
                if (querySnapshot.docs[0]._data.pass == pass) {
                    gotonext();
                   
                } else {
                    Alert.alert('Wrong Password');
                }
            })
            .catch(error => {
                Alert.alert('No user Found');
                console.log(error);
            });
    };
    const gotonext = async () => {
        await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
        navigation.navigate('Cart');
        dispatch(addItemToCart({
            id: route.params.data.id,
            title: route.params.data.title,
            price: route.params.data.price,
            description: route.params.data.description,
            category: route.params.data.category,
            qty: qty,
            rating: route.params.data.rating,
            image: route.params.data.image,
        }))
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'Login'}</Text>

            <TextInput
                placeholder="Enter Email"
                style={styles.input}
                value={email}
                onChangeText={txt => setEmail(txt)}
            />

            <TextInput
                placeholder="Enter password"
                style={styles.input}
                value={pass}
                onChangeText={txt => setPass(txt)}
            />

            <CustomButton
                bg={'#63368a'}
                title={'Login'}
                color={'#fff'}
                onClick={() => {
                    loginUser();
                }}
            />
            <Text
                style={styles.loginText}
                onPress={() => {
                    navigation.navigate('Signup');
                }}>
                {'Sign up'}
            </Text>
        </View>
    );
};

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        color: '#000',
        fontSize: 40,
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 50,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        paddingLeft: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    loginText: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});