import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { addProducts } from '../../redux/slices/ProductSlice';


const { height, width } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);


    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                json.map(item =>{
                    item.qty = 1;
                });
                dispatch(addProducts(json));
            })
    }


    return (
        <View style={styles.container}>
            <Header
                leftIcon={require('../../images/menu.png')}
                rightIcon={require('../../images/cart1.png')}
                title={'Ecom App'}
                onClickLeftIcon={() => {
                    navigation.openDrawer();
                }}
                isCart ={true}
            />

            <FlatList data={products} renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={() => navigation.navigate("ProductDetail", { data: item })}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View>
                            <Text style={styles.title}>
                                {item.title.length > 25 ?
                                    item.title.substring(0, 25) + "..."
                                    : item.title}
                            </Text>
                            <Text style={styles.desc}>
                                {item.description.length > 30 ?
                                    item.description.substring(0, 30) + "..."
                                    : item.description}
                            </Text>
                            <Text style={styles.price}>
                                ₹ {item.price}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productItem: {
        width: width,
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
    title: {
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

    }

})