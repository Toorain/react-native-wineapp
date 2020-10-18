import {View, StyleSheet, Image, Text} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

const ProductImage = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const url = 'http://146.59.156.251:3000/images/bottleImg';

  return (
    <View style={styles.center}>
      <CapitalizedText style={styles.bottleText}>{route.params.brand_name}</CapitalizedText>
      { fetch(url).then(res => { return res.status !== 404} ) ? (
        <Image
          source={{uri: url + route.params.product_img}}
          style={styles.imageBig}
        />
      ) : (
        <Placeholder image={'bouteillePlaceholder.png'} style={styles.imageBig} />
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
