import { FlatList, StyleSheet, Text, View} from "react-native";
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

  async componentDidMount() {
    this.getTokenFunction();
  }

  render() {
    return (
      <View>
        {this.state.productList !== null ? (
          <FlatList
            data={this.state.productList}
            renderItem={({ item }) =>
              <View>
                <Text>{ item.brand_name }</Text>
                <Text>{ item.color }</Text>
              </View>
            }
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

})
