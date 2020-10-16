import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../App";
import Collapsible from "react-native-collapsible";
import {RadioButton} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

const AddProduct = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;

  useEffect(() => {
    AsyncStorage.getItem('token').then(tokenValue => {
      setToken(tokenValue);
    });
  })

  const [token, setToken]: any = React.useState('');
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
  const [chenin, setChenin] = React.useState('');
  const [chardonnay, setChardonnay] = React.useState('');
  const [sauvignon, setSauvignon] = React.useState('');
  const [cabernetSauvignon, setCabernetSauvignon] = React.useState('');
  const [cabernetFranc, setCabernetFranc] = React.useState('');
  const [pinotNoir, setPinotNoir] = React.useState('');
  const [merlot, setMerlot] = React.useState('');
  const [syrah, setSyrah] = React.useState('');
  const [grenache, setGrenache] = React.useState('');


/*&& riesling !== '' && gewur !== '' && viognier !== '' && chenin !== '' && chardonnay !== '' && sauvignon !== ''
  && cabernetSauvignon !== '' && cabernetFranc !== '' && pinotNoir !== '' && merlot !== '' && syrah !== '' && grenache !== ''*/

  const getCepages = () => {
    // const cepagesNames = ['riesling', 'gewur', 'viognier', 'chenin', 'chardonnay', 'sauvignon', 'cabernetSauvignon', 'cabernetFranc', 'pinotNoir', 'merlot', 'syrah', 'grenache'];

    return {
      riesling: riesling !== '' ? riesling : null,
      gewurztraminer: gewur !== '' ? gewur : null,
      viognier: viognier !== '' ? viognier : null,
      chenin: chenin !== '' ? chenin : null,
      chardonnay: chardonnay !== '' ? chardonnay : null,
      sauvignon: sauvignon !== '' ? sauvignon : null,
      cabernetSauvignon: cabernetSauvignon !== '' ? cabernetSauvignon : null,
      cabernetFranc: cabernetFranc !== '' ? cabernetFranc : null,
      pinotNoir: pinotNoir !== '' ? pinotNoir : null,
      merlot: merlot !== '' ? merlot : null,
      syrah: syrah !== '' ? syrah : null,
      grenache: grenache !== '' ? grenache : null
    };
    /*let cepageObj = {};
    cepagesNames.forEach(cepageName => {
      if (cepageName !== '') {
        let key = cepageName;
        cepageObj[key] = React.useState(cepageName);
      }
    })
    return cepageObj;*/
  }

  const checkFormAndValid = () => {
    const cepagesObj: any =  getCepages();
    for (const elm in cepagesObj) {
      if (cepagesObj[elm] === null) {
        delete cepagesObj[elm];
      }
    }
    console.log(cepagesObj);
    if (brand_name !== '' && year !== '' && color !== ''
      && buy_price_ht !== '' && sell_price_ht !== '' && quantity !== '')
    {
      fetch('http://146.59.156.251:3000/products/getAll', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          brand_name: brand_name,
          year: year,
          color: color,

        })
      }).then(res => res.json())
        .then(json => {})
    }
  }

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
            <TouchableOpacity onPress={() => {
              setCepageChecked('white');
              setColor('blanc')
              toggleExpandedWhite(false);
              toggleExpandedRed(true);
            }}>
              <View style={styles.blockRadio}>
                <RadioButton
                  value={'Vin blanc'}
                  status={cepageChecked === 'white' ? 'checked' : 'unchecked'}
                />
                <Text style={styles.cepageName}>Blanc</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setCepageChecked('red');
                setColor('rouge')
                toggleExpandedWhite(true);
                toggleExpandedRed(false);
              }}>
              <View style={styles.blockRadio}>
                <RadioButton
                  value={'Vin rouge'}
                  status={cepageChecked === 'red' ? 'checked' : 'unchecked'}
                />
                <Text style={styles.cepageName}>Rouge</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setCepageChecked('rose');
                setColor('rose')
                toggleExpandedWhite(true);
                toggleExpandedRed(false);
              }}>
              <View style={styles.blockRadio}>
                <RadioButton
                  value={'rose'}
                  status={cepageChecked === 'rose' ? 'checked' : 'unchecked'}
                />
                <Text style={styles.cepageName}>Rosé</Text>
              </View>
            </TouchableOpacity>
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
                      onChangeText={text => setRiesling(text)}
                      value={riesling}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Gewürztraminer</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setGewur(text)}
                      value={gewur}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Viognier</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setViognier(text)}
                      value={viognier}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Chenin</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setChenin(text)}
                      value={chenin}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Chardonnay</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setChardonnay(text)}
                      value={chardonnay}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Sauvignon</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setSauvignon(text)}
                      value={sauvignon}
                    />
                  </View>
                </Collapsible>
              ) : (
                <Collapsible collapsed={isCollapsedRed}>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Cabernet-sauvignon</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCabernetSauvignon(text)}
                      value={cabernetSauvignon}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Cabernet-franc</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setCabernetFranc(text)}
                      value={cabernetFranc}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Pinot Noir</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setPinotNoir(text)}
                      value={pinotNoir}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Merlot</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setMerlot(text)}
                      value={merlot}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Syrah</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setSyrah(text)}
                      value={syrah}
                    />
                  </View>
                  <View style={styles.blockCepage}>
                    <Text style={styles.cepageName}>Grenache</Text>
                    <TextInput
                      style={styles.textCepage}
                      onChangeText={text => setGrenache(text)}
                      value={grenache}
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
        <View style={styles.block}>
          <Button
            title={'Ajouter le produit'}
            onPress={() => checkFormAndValid() } />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    padding: 10,
  },
  blockButton: {
    marginBottom: 20,
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
