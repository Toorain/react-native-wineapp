import {View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import Collapsible from "react-native-collapsible";
import {RadioButton} from "react-native-paper";

const AddProduct = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;
  const [brand_name, setBrand_name] = React.useState('');
  const [year, setYear] = React.useState('');
  const [color, setColor] = React.useState('');
  const [cepage, setCepage] = React.useState('');
  const [cepageChecked, setCepageChecked] = React.useState('white');
  const [buy_price_ht, setBuy_price_ht] = React.useState('');
  const [sell_price_ht, setSell_price_ht] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [riesling, setRiesling ] = React.useState('');
  const [gewur, setGewur] = React.useState('');
  const [viognier, setViognier] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');
  const [, ] = React.useState('');



  const [isCollapsedWhite, toggleExpandedWhite] = React.useState(false);
  const [isCollapsedRed, toggleExpandedRed] = React.useState(true);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.block}>
          <Text style={styles.description}>Nom de la bouteille :</Text>
          <TextInput
            style={styles.text}
            onChangeText={text => setBrand_name(text)}
            value={brand_name}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Année</Text>
          <TextInput
            style={styles.text}
            keyboardType={"numeric"}
            onChangeText={text => setYear(text)}
            value={year}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Couleur</Text>
          <View style={styles.blockRadio}>
            <View style={styles.blockRadio}>
              <RadioButton
                value={'Vin blanc'}
                status={cepageChecked === 'white' ? 'checked' : 'unchecked'}
              />
              <TouchableOpacity onPress={() => {
                setCepageChecked('white');
                toggleExpandedWhite(false);
                toggleExpandedRed(true);
              }}>
                <Text style={styles.cepageName}>Blanc</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.blockRadio}>
              <RadioButton
                value={'Vin rouge'}
                status={cepageChecked === 'red' ? 'checked' : 'unchecked'}
              />
              <TouchableOpacity onPress={() => {
                setCepageChecked('red');
                toggleExpandedWhite(true);
                toggleExpandedRed(false);
              }}>
                <Text style={styles.cepageName}>Rouge</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.blockRadio}>
              <RadioButton
                value={'rose'}
                status={cepageChecked === 'rose' ? 'checked' : 'unchecked'}
              />
              <TouchableOpacity onPress={() => {
                setCepageChecked('rose');
                toggleExpandedWhite(true);
                toggleExpandedRed(false);
              }}>
                <Text style={styles.cepageName}>Rosé</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Cépage(s)</Text>
          <View style={styles.cepageList}>
            <View style={styles.cepageColor}>
              { isCollapsedRed ? (
                <Collapsible collapsed={isCollapsedWhite}>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Riesling</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Gewürztraminer</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Viognier</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Chenin</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Chardonnay</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Sauvignon</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                </Collapsible>
              ) : (
                <Collapsible collapsed={isCollapsedRed}>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Cabernet-sauvignon</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Cabernet-franc</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Pinot Noir</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Merlot</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Syrah</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Grenache</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCepage(text)}
                      value={cepage}
                    />
                  </View>
                </Collapsible>
              ) }
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Prix d'achat HT</Text>
          <TextInput
            style={styles.text}
            keyboardType={"numeric"}
            onChangeText={text => setBuy_price_ht(text)}
            value={buy_price_ht}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Prix de vente HT</Text>
          <TextInput
            style={styles.text}
            keyboardType={"numeric"}
            onChangeText={text => setSell_price_ht(text)}
            value={sell_price_ht}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.description}>Quantité</Text>
          <TextInput
            style={styles.text}
            keyboardType={"numeric"}
            onChangeText={text => setQuantity(text)}
            value={quantity}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    padding: 10,
  },
  blockCepage: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  blockRadio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  cepageList: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cepageCat: {
    fontSize: 20,
    textAlign: "center"
  },
  cepageName: {
    fontSize: 18,
    marginHorizontal: 5
  },
  cepageColor: {
    width: '100%'
  },
  container: {
    alignItems: "center",
  },
  description: {
    fontSize: 24,
    marginBottom: 10,
  },
  main: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center"
  },
  textCepage: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    width: 60,
    fontSize: 20,
    textAlign: "center"
  },
  wrapper: {
    width: '90%'
  },
});

export default AddProduct
