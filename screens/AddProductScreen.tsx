import {View, StyleSheet, TextInput} from "react-native";
import React from "react";
import {AuthContext} from "../App";

const AddProduct = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;
  const [brand_name, setBrand_name] = React.useState('');
  const [year, setYear] = React.useState('');
  const [color, setColor] = React.useState('');
  const [cepage, setCepage] = React.useState('');
  const [buy_price_ht, setBuy_price_ht] = React.useState('');
  const [sell_price_ht, setSell_price_ht] = React.useState('');
  const [quantity, setQuantity] = React.useState('');


  return (
    <View>
      <TextInput
        style={styles.text}
        onChangeText={text => setBrand_name(text)}
        value={brand_name}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setYear(text)}
        value={year}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setColor(text)}
        value={color}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setCepage(text)}
        value={cepage}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setBuy_price_ht(text)}
        value={buy_price_ht}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setSell_price_ht(text)}
        value={sell_price_ht}
      />
      <TextInput
        style={styles.text}
        onChangeText={text => setQuantity(text)}
        value={quantity}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  text: {

  },
});

export default AddProduct
