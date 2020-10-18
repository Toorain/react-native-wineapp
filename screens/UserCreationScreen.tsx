import React from "react";
import {View, StyleSheet, Text, ScrollView, Alert, Button} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AuthContext} from "../App";
import FormField from '../components/FormField';
import {formData} from '../components/formData';


const UserCreationScreen = ({navigation, route}: any, props: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;
  const [formValues, handleFormValueChange, setFormValues] = formData({
    username: '',
    password:'',
    first_name:'',
    last_name:'',
    roles:'',
  })


  const checkFormAndValid = () => {
    let userObj: any =  formValues();
    for (const elm in userObj) {
      if (userObj[elm] === null) {
        delete userObj[elm];
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
          roles: '',
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
        <FormField
          label='Roles'
          formKey='roles'
          placeholder=''

          handleFormValueChange={handleFormValueChange}
        />
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
            title={'Ajouter le produit'}
            onPress={() => checkFormAndValid() }
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    padding: 10,
  },
  container: {
    display: 'flex',
    margin: 20,
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  }
})

export default UserCreationScreen;
