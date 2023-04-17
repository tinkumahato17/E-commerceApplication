import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const Signup = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const addUser = () => {
        firestore()
            .collection('Users')
            .add({
                name: name,
                email: email,
                mobile: mobile,
                pass: pass
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate('Login');
                Alert.alert('Signup Succesfully');
            });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'Signup'}</Text>
            <TextInput
                placeholder='Enter your name'
                style={styles.input}
                value={name}
                onChangeText={
                    txt => setName(txt)
                }
            />
            <TextInput
                placeholder='Enter Email'
                style={styles.input}
                value={email}
                onChangeText={
                    txt => setEmail(txt)
                }
            />
            <TextInput
                placeholder='Enter Mobile'
                style={styles.input}
                value={mobile}
                onChangeText={
                    txt => setMobile(txt)
                }
            />
            <TextInput
                placeholder='Enter Password'
                style={styles.input}
                value={pass}
                onChangeText={
                    txt => setPass(txt)
                }
            />
            <TextInput
                placeholder='Enter Confirm Password'
                style={styles.input}
                value={confirmPass}
                onChangeText={
                    txt => setConfirmPass(txt)
                }
            />

            <CustomButton
                bg={'#63368a'}
                title={'Sign up'}
                color={'#fff'}
                onClick={() => {
                    addUser();
                }} />

            <Text
                style={styles.logText}
                onPress={() => {
                    navigation.navigate('Login')
                }}>{'Log in'}</Text>
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        paddingLeft: 20,
        alignSelf: 'center',
        marginTop: 10
    },
    logText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    }
})