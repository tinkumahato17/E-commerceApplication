import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../common/Header';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const products = useSelector(state => state);
  //console.log(JSON.stringify(products.product.data));
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(products.product.data);
  const [searchList, setSearchList] = useState(oldData);
  const filterData = txt => {
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchList(newData);
  }
  return (
    <View style={styles.container}>
      <Header title={'Search Items'}  rightIcon={require('../../images/cart1.png')} isCart={true}/>
      <View style={styles.searchView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../images/search.png')} style={styles.icon} />
          <TextInput
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder='Search item here....'
            style={styles.textInput}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity style={[styles.icon, { justifyContent: 'center', alignItems: 'center' }]}
          onPress={()=> {
            setSearch('');
            filterData('');
          }}
          >
            <Image source={require('../../images/close.png')} style={[styles.icon, { width: 16, height: 16 }]} />
          </TouchableOpacity>
        )}
      </View>

      <View style ={{marginTop:10}}>
      <FlatList data={searchList} renderItem={({item, index}) => {
        return (
          <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={() =>{ navigation.navigate("ProductDetail", { data: item })}}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            {/* { this.state.ImageURI !== '' ? <Image source={this.state.ImageURI} /> :null} */}
            <View>
              <Text style={styles.Title}>
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

    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'center'
  },
  textInput: {
    width: '80%',
    marginLeft: 10,
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
    marginLeft: 20,
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