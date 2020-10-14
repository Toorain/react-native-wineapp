import {View, StyleSheet, Image, Text} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";

const ProductImage = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const url = 'https://www.cave-fraisse.fr/1768-large_default/demi-bouteille-vin-rouge-bourgogne-hautes-cotes-de-beaune-.jpg';

  return (
    <View style={styles.center}>
      <CapitalizedText style={styles.bottleText}>{route.params}</CapitalizedText>
      { fetch(url).then(res => { return res.status !== 404} ) ? (
        <Image
          source={{uri: url}}
          style={styles.imageBig}
        />
      ) : (
        <Image
          source={require('../assets/images/placeholder.jpg')}
          style={styles.imageBig}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  bottleText: {
    marginBottom: 50,
    fontSize: 30,
    textAlign: "center"
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: '100%'
  },
  imageBig: {
    height: '70%',
    width: '70%',
    resizeMode: "contain",
  }
});

export default ProductImage
