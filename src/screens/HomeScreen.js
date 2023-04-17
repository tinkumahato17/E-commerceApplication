import { View, StyleSheet, TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../common/Header';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Wishlist from './tabs/Wishlist';
import Notification from './tabs/Notification';
import Profile from './tabs/Profile';

const HomeScreen = () => {
    const [selectedTab, setselectedTab] = useState(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return (
        <View style={styles.container}>
            {/* <Header
                leftIcon={require('../images/menu.png')}
                rightIcon={require('../images/cart1.png')}
                title={'Ecom App'}
            /> */}
            {
                selectedTab == 0 ? (
                    <Home />
                ) : selectedTab == 1 ? (
                    <Search />
                ) : selectedTab == 2 ? (
                    <Wishlist />
                ) : selectedTab == 3 ? (
                    <Notification />
                ) : (
                    <Profile />
                )}

            {!isKeyboardVisible && (
                <View style={styles.bottomView}>
                    <TouchableOpacity
                        style={styles.bottomTab}
                        onPress={() => {
                            setselectedTab(0)
                        }}
                    >
                        <Image
                            source={selectedTab == 0 ? require('../images/home-fill.png') : require('../images/home1.png')}
                            style={styles.bottomTabIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTab}
                        onPress={() => {
                            setselectedTab(1)
                        }}
                    >
                        <Image
                            source={selectedTab == 1 ? require('../images/search-fill.png') : require('../images/search.png')}
                            style={styles.bottomTabIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTab}
                        onPress={() => {
                            setselectedTab(2)
                        }}
                    >
                        <Image
                            source={selectedTab == 2 ? require('../images/heart-fill.png') : require('../images/heart1.png')}
                            style={styles.bottomTabIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTab}
                        onPress={() => {
                            setselectedTab(3)
                        }}
                    >
                        <Image
                            source={selectedTab == 3 ? require('../images/notification-fill.png') : require('../images/notification2.png')}
                            style={styles.bottomTabIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTab}
                        onPress={() => {
                            setselectedTab(4)
                        }}
                    >
                        <Image
                            source={selectedTab == 4 ? require('../images/profile-fill.png') : require('../images/profile1.png')}
                            style={styles.bottomTabIcon}
                        />
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTabIcon: {
        height: 20,
        width: 20
    }
})