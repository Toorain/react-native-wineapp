import {View, StyleSheet, Image, Text} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";

const ProductsDetails = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);

  return (
    <View style={styles.main}>
      <Image style={styles.label} source={require('../assets/images/label1.jpg')} />
      <View style={styles.horizontalSplit}>
        <Image style={styles.bottle} source={require('../assets/images/bouteille1.png')} />
        <View style={styles.textWrapper}>
          <CapitalizedText>{route.params.brand_name}</CapitalizedText>
          <Text>{route.params.year}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  bottle: {
    width: 50,
    height: 200,
    resizeMode: "contain"
  },
  horizontalSplit: {
    flexDirection: "row"
  },
  label: {
    width: '50%',
    height: 250,
    resizeMode: "contain"
  },
  textWrapper: {
    alignItems: "center"
  }
});

export default ProductsDetails
