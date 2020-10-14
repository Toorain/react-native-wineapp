import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default class ProductsScreen extends Component<{}, { productList: any, numColumns: any }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      productList: [],
      numColumns: Number,
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
        <Image style={styles.image} source={require('../assets/images/bouteille1.png') }/>
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
      <View 
      onLayout={(event) => {
        const {width} = event.nativeEvent.layout
        // const {width} = Dimensions.get('window')
        const itemWidth = 335
        const numColumns = Math.floor(width/itemWidth)
        this.setState({  numColumns: numColumns })
      }}
      style={styles.flatlist}>
        {this.state.productList !== null ? (
          <FlatList
            // contentContainerStyle={styles.flatlist}
            // columnWrapperStyle={{ flexWrap: 'wrap', flexDirection: "row"}}
            key={this.state.numColumns}
            numColumns={this.state.numColumns}
            data={this.state.productList}
            renderItem={this._renderItem}
            keyExtractor={ item => item._id }
          />
          ): (
            <Text>No products or error</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatlist: {
    // flexDirection : "row",
    // flexGrow: 1,
    flex:1, 
    alignItems: 'center',
  },
  main: {
  },
  itemWrapper: {
    flex: 1,
    maxWidth: 300,
    minWidth: 300,
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: 50,
    margin: 30,
    resizeMode: "contain"
  },
  textWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'red'
  },
  imageWrapper: {
    flex: 1
  },
  bottomInfo: {

  },
})
