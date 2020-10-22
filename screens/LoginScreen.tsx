import { View, StyleSheet, TextInput, TouchableHighlight, Text} from "react-native";
import React from "react";
import Logo from "../components/Logo";
import {AuthContext} from "../App";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // TODO : Find a way NOT to import AuthContext from App.tsx but use it anyway. LVL 10
  const { signIn }: any = React.useContext(AuthContext);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Logo />
        <View style={styles.box}>
          <TextInput
            style={styles.formInput}
            onChangeText={setUsername}
            value={username}
            placeholder={'Login'}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            style={styles.formInput}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder={'Password'}
          />
        </View>
        <TouchableHighlight
          onPress={() => signIn({username, password})}
          style={styles.button}
        >
          <View>
            <Text style={styles.text}>Valider</Text>
          </View>
        </TouchableHighlight>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#15534D",
    padding: 4,
    width: '60%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 5,
  },
  formInput: {
    fontSize: 25,
    textAlign: "center"
  },
  box: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 4,
    width: '60%',
    marginVertical: 15,
  },
});

export default LoginScreen
