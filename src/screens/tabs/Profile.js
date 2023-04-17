import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image source={require('../../images/user.png')} style={styles.user} />
      <Text style={styles.name}>{'Name'}</Text>
      <Text style={[styles.name, { fontSize: 20, marginTop: 0 }]}>{'tinkusdfkjns@gmail.com'}</Text>
      <TouchableOpacity style={[styles.tab, { marginTop: 30 }]}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}
        onPress={() => {
          navigation.navigate('Orders');
        }}
      >
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 10,
  },
  tab: {
    borderBottomWidth: 0.5,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderBottomColor: '#A3A3A3',
    paddingLeft: 20,
    justifyContent: 'center'
  },
  txt: {
    color: '#000',
    //fontWeight:'300'
  }

})