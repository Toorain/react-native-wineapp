import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import CapitalizedText from "../components/CapitalizedText";

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
        <TouchableOpacity onPress={() => {
          // @ts-ignore
          this.props.navigation.navigate('ProductImage', item.brand_name);
        }}>
          <Image
            style={styles.image}
            source={require('../assets/images/bouteille1.png') }/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.textWrapper} onPress={() => {
        // @ts-ignore
        this.props.navigation.navigate('ProductsDetails', item);
      }}>
        <CapitalizedText style={styles.textTitle}>{item.brand_name}</CapitalizedText>
          <Text style={styles.text}>{item.year}</Text>
          <CapitalizedText style={styles.text}>{item.color}</CapitalizedText>
          <Text style={styles.importantInfoText}>{item.sell_price_ht} €</Text>
          <Text style={styles.importantInfoText}>Qté : {item.quantity}</Text>
      </TouchableOpacity>
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
      style={styles.flatlist}
      >
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
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  importantInfoText: {
    fontSize: 20
  },
  itemWrapper: {
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
    width: 90,
    margin: 30,
    resizeMode: "contain"
  },
  textWrapper: {
    flex: 2,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginTop: 10
  },
})
