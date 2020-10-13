import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default class ProductsScreen extends Component<{}, { productList: any }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      productList: []
    }
  }

  getTokenFunction = () => {
    AsyncStorage.getItem('token').then(value => {
      this.getAllItems(value);
    });
  }

  getAllItems = (token: string | null) => {
    fetch('http://146.59.156.251:3000/products/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.json())
      .then(json => {
        this.setState({ productList: json });
        console.log(json);
        console.log('GetAllItems');
      });
  }
// When component is loaded
  async componentDidMount() {
    this.getTokenFunction();
  }

//renderItem
  _renderItem = ({ item }: any) => (

    <View style={styles.itemWrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../assets/images/winelogo.png') }/>
      </View>
      <View style={styles.textWrapper}>
        <Text>{item.brand_name}</Text>
        <Text>{item.year}</Text>
        <Text>{item.color}</Text>
        <View style={styles.bottomInfo}>
          <Text>{item.sell_price_ht} €</Text>
          <Text>{item.quantity}</Text>
        </View>
      </View>
    </View>
  )
 
  render() {
    return (
      <View style={styles.motherWrapper}>
        {this.state.productList !== null ? (
          <FlatList
            numColumns={4}
            columnWrapperStyle={{ flexWrap: 'wrap'}}
            data={this.state.productList}
            renderItem={this._renderItem}
            keyExtractor={ item => item._id }
            style={styles.mainWrapper}
          />
          ): (
            <Text>No products or error</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  motherWrapper: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainWrapper: {
    flex: 1,
    width: '45%',
  },
  itemWrapper: {
    // width: '45%',
    width:300,
    minWidth: 300,
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
  image: {
    height: 180,
    width: 100,
    margin: 30,
    resizeMode: "contain"
  },
  textWrapper: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'red'
  },
  imageWrapper: {
    width: "20%",
  },
  bottomInfo: {

  },
})
