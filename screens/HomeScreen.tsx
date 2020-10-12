import {View, StyleSheet, TextInput, TouchableHighlight, Text} from "react-native";
import { Icon } from 'react-native-elements';
import React from "react";
import {AuthContext} from "../App";
import AsyncStorage from "@react-native-community/async-storage";
import Logo from "../components/Logo";

const HomeScreen = ({navigation}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const [search, setSearch] = React.useState('');

  AsyncStorage
    .getItem('token')
    .then(keyValue => {
      console.log(keyValue);
    }, error => {
      console.log(error);
    });
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.flex}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.formInput}
            onChangeText={setSearch}
            value={search}
            placeholder={'Search'}
          />
        </View>
        <View style={styles.icon}>
          <Icon
            name={"search"}
            type={"material"}
            size={40}
            color={"gray"}
            onPress={() => {

            }
            }
          />
        </View>
      </View>
      <View style={styles.underSearch}>
        <TouchableHighlight
          style={styles.margin}
          onPress={() => {

          }}
        >
          <View>
            <Text style={styles.text}>Afficher tout</Text>
          </View>
        </TouchableHighlight>
          <TouchableHighlight style={styles.margin}>
            <View>
              <Text style={styles.text}>Recherche avancée</Text>
            </View>
          </TouchableHighlight>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 50
  },
  searchBox: {
    margin: "auto",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 5,
    width: '60%',
    height: 45,
    marginVertical: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#15534D",
    padding: 5,
    width: '60%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 40,
    marginBottom: 20,
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  formInput: {
    fontSize: 25,
    textAlign: "center"
  },
  icon: {
    marginLeft: 10
  },
  margin: {
    margin: '5%',
  },
  text: {
    fontSize: 15,
    color: 'black',
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  underSearch: {
    flex: 1,
    flexDirection: "row",
  },
});

export default HomeScreen
