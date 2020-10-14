import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem, SearchBar } from 'react-native-elements';

export default class ProductsScreen extends Component<{}, { productList: any, searchList : any, numColumns: any, searchText : any, item : any }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      productList: [],
      searchList: [],
      searchText : String,
      numColumns: Number,
      item: String,
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
        this.setState({
          productList: json,
          searchList: json });
      });
  }

  searchFilterFunction = (text:string) => {
    if (text === ""){
      this.setState({
        item: this.state.productList
      })
    }
    this.setState({
      item: text,
    });

    const newData = this.state.productList.filter((item : any) => {
      const itemData = item.brand_name.toUpperCase() + item.year + item.color.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchList: newData,
    });
  };

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
  renderSearchbarHeader = () => {
    return (
      <SearchBar
        placeholder="Recherche..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.searchText}
        containerStyle = {styles.searchbar}
      />
    );
  };

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
        { this.renderSearchbarHeader() }
        {this.state.productList !== null ? (
            <FlatList
              // contentContainerStyle={styles.flatlist}
              // columnWrapperStyle={{ flexWrap: 'wrap', flexDirection: "row"}}
              key={this.state.numColumns}
              numColumns={this.state.numColumns}
              data={this.state.searchList}
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
  searchbar: {
    width: '100%'
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
