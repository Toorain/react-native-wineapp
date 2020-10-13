import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default class ProductsScreen extends Component<{}, { getValue: string | null, productList: any }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      getValue: '',
      productList: []
    }
    this.getValueFunction();
    this.getAllItems();
  }

  getValueFunction = () => {
    AsyncStorage.getItem('token').then(value => {
      this.setState({ getValue: value });
    })
  }

  getAllItems = () => {
    fetch('http://146.59.156.251:3000/products/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImwiLCJzdWIiOiI1Zjg1NTVlOWE0MzJhODllZjUyMmU1MjciLCJyb2xlcyI6WyJhZG1pbiIsInNhbGxlIiwiZWNvbm9tZSJdLCJpYXQiOjE2MDI1Nzg5MzAsImV4cCI6MTYwMjU3OTE0MH0.0p9GU0FIZ-_X98wLCoH1dx_1OcSEuXGh4pvJHBD9Lg4',
      },
    }).then(res => res.json())
      .then(json => {
        this.setState({ productList: json });
        console.log(json);
      });
  }

  componentDidMount() {
    this.getValueFunction();
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
