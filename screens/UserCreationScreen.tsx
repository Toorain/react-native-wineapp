import React,{useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Alert, Button, AsyncStorage, TextInput} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AuthContext} from "../App";
import FormField from '../components/FormField';
import {formData} from '../components/formData';
import {RadioButton} from "react-native-paper";
// import Collapsible from "react-native-collapsible";


const UserCreationScreen = ({navigation, route}: any, props: any) => {
  const [checked, setChecked] = React.useState('salle');
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;
  const [formValues, handleFormValueChange, setFormValues] = formData({
    username: '',
    password:'',
    first_name:'',
    last_name:'',
    roles:{},
  })

  useEffect(() => {
    console.log(item);

    AsyncStorage.getItem('token').then((tokenValue: any) => {
      setToken(tokenValue);
    });
  })

  const [token, setToken]: any = React.useState('');

  const checkFormAndValid = () => {
    for (const elm in formValues) {
      if (formValues[elm] === null) {
        delete formValues[elm];
      }
    }
    if (formValues.username !== '' && formValues.password !== '' && formValues.first_name !== ''
      && formValues.last_name !== '' && formValues.roles !== '')
    {
      fetch('http://146.59.156.251:3000/users/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          username: formValues.username,
          password: formValues.password,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          roles: formValues.roles,
        })
      }).then(res => {
        if (res.status === 201) {
          Alert.alert(
            'Utilisateur ajouté',
            'Utilisateur ajouté avec succès',
              [
                { text: 'Ok', onPress: () => console.log('Ok') },
              ],
            { cancelable : false }
          )
        } else {
          Alert.alert(
            'ERREUR',
            "L'utilisateur existe déjà",
            [
              { text: 'Ok', onPress: () => console.log('Ok') }
            ],
            { cancelable: false }
          )
        }
        return res.json();
      })
        .then(json => {

          console.log(json);
        })
    }
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.container}>
        <FormField
          label="Nom du compte"
          formKey='username'
          placeholder=''

          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          label='Mot de passe'
          formKey='password'
          placeholder=''
          textInputProps={{
            autoCapitalize: "none"
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          label='Prénom'
          formKey='first_name'
          placeholder=""

          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          label='Nom de famille'
          formKey='last_name'
          placeholder=''

          handleFormValueChange={handleFormValueChange}
        />
            <View style={styles.formFieldWrapper}>
              <View style={styles.textWrapper}>  
                <View style={styles.horizontalSplit}>
                  <View style={styles.horizontalColumnRoles}>
                  <Text style={styles.labelText}>Rôle(s)</Text>
                  </View>
                  <View style={styles.horizontalColumn}>
                    <View>
                      <View style={styles.buttonContainer}>
                        <RadioButton
                          
                          value="salle"
                          status='checked'
                          onPress={() => setChecked('salle')}
                        />
                        <Text style={styles.buttonText}>Salle</Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        <RadioButton
                          value="econome"
                          status='unchecked'
                          onPress={() => setChecked('econome')}
                        />
                        <Text style={styles.buttonText}>Econome</Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        <RadioButton
                          value="admin"
                          status='unchecked'
                          onPress={() => setChecked('admin')}
                        />
                        <Text style={styles.buttonText}>Admin</Text>
                      </View>
                    </View>
                    {/* <TextInput
                        placeholder=''
                        style={styles.formFieldText}
                        onChange={(event) => props.handleFormValueChange('roles', event.nativeEvent.text)}
                        {...props.textInputProps}
                    />  */}
                  </View>
                </View>
              </View>
            </View>
        {/* <Text style={styles.header}>Values in Hook: </Text>
        <View>
          <Text style={styles.formText}>Username is : {formValues.username}</Text>
          <Text style={styles.formText}>Password is: {formValues.password}</Text>
          <Text style={styles.formText}>first_name is: {formValues.first_name}</Text>
          <Text style={styles.formText}>last_name is: {formValues.last_name}</Text>
          <Text style={styles.formText}>Roles is: {formValues.roles}</Text>
        </View> */}
        <View style={styles.block}>
          <Button
            title={'Créer nouvel utilisateur'}
            onPress={() => checkFormAndValid() }
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 19,
  },
  block: {
    padding: 10,
  },
  container: {
    display: 'flex',
    margin: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  },
  textWrapper: {
  },
  horizontalSplit: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: '95%',
    marginTop: '2%',
  },
  horizontalColumn: {
    width: "4%",
    flex:1,
    justifyContent: "space-evenly",
  },
  horizontalColumnRoles: {
    width: "40%",
    flex:1,
  },
  text: {
    fontSize: 18,
    marginVertical: 8
  },
  formFieldWrapper: {

  },
  formFieldText: {
    fontSize: 20,
    borderRadius: 7,
    borderWidth: 1,
    padding: 12
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10
  }

})

export default UserCreationScreen;
