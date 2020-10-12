import { View, StyleSheet, TextInput, TouchableHighlight, Text} from "react-native";
import React from "react";
import Logo from "../components/Logo";
import {AuthContext} from "../App";

const ProductsScreen = ({navigation}: any) => {

  // TODO : Find a way NOT to import AuthContext from App.tsx but use it anyway. LVL 10
  const { signIn }: any = React.useContext(AuthContext);

  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default ProductsScreen
