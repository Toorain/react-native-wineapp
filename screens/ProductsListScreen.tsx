import { View, StyleSheet, Text} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

function getProducts(productName: string = '') {
  const bearerToken = AsyncStorage.getItem('token');
  alert(bearerToken);

  let productUrl: string;

  productName !== '' || productName !== null
    ? productUrl = 'products/getAll'
    : productUrl = 'products/getOne/' + productName;

  fetch('http://146.59.156.251:3000/products/getAll' , {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + bearerToken
    },
  }).then(res => res.json())
    .then(json => {
      if (typeof json.statusCode === "number") {
        alert('Vous n\'êtes pas autorisé(e) à afficher cet élément');
      }
      console.log(json);
    });

}

const ProductsListScreen = ({ navigation, route }: any) => {
  {getProducts()}
  return (
    <View>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default ProductsListScreen
