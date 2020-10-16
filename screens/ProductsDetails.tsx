import {View, StyleSheet, Image, Text, ScrollView} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

const ProductsDetails = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;

  return (
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.horizontalSplit}>
        { item.product_img !== '' ? (
          <Image style={styles.bottle} source={{ uri : 'http://146.59.156.251:3000/images/bottleImg' + item.product_img }} />
        ) : (
          <Placeholder style={styles.bottle} />
        )}
        { item.label_img !== '' ? (
          <Image style={styles.label} source={{ uri : 'http://146.59.156.251:3000/images/labelImg' + item.label_img }} />
        ) : (
          <Placeholder style={styles.label} />
        )}
      </View>
      <View style={styles.horizontalSplit}>
        <View style={styles.textWrapper}>
          <CapitalizedText style={styles.textMain}>{item.brand_name}</CapitalizedText>
          <Text style={styles.text}>Année : {item.year}</Text>
          <Text style={styles.text}>Couleur : <CapitalizedText>{item.color}</CapitalizedText></Text>
          <Text style={styles.textTitle}>Cépages :</Text>
          { Object.entries(item.cepage).map(([key, val]) =>
            <View style={styles.center} key={key}>
              <CapitalizedText style={styles.text}>{key}</CapitalizedText>
              <Text style={styles.text}> : {val}</Text>
            </View>
          )}
          <Text style={styles.text}>Prix d'achat : {item.buy_price_ht} € | Prix de vente : {item.sell_price_ht} €</Text>
          <Text style={styles.text}>Quantité en stock : {item.quantity}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const marginElms = 8;

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  bottle: {
    flex: 1,
    width: '20%',
    height: 200,
    resizeMode: "contain"
  },
  label: {
    flex: 3,
    width: '80%',
    height: 250,
    resizeMode: "contain"
  },
  center: {
    flexDirection: "row",
    alignItems: "center"
  },
  horizontalSplit: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: '90%',
    marginTop: '2%'
  },
  text: {
    fontSize: 18,
    marginVertical: marginElms
  },
  textTitle: {
    fontSize: 26,
    marginVertical: marginElms,
    textDecorationLine: "underline"
  },
  textMain: {
    textAlign: "center",
    marginVertical: marginElms,
    fontSize: 40,
    textDecorationLine: "underline"
  },

  textWrapper: {
    width: '100%',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default ProductsDetails
