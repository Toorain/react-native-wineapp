import React from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
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
        <Text style={styles.header}>Values in Hook: </Text>
        <View>
          <Text style={styles.formText}>Username is : {formValues.username}</Text>
          <Text style={styles.formText}>Password is: {formValues.password}</Text>
          <Text style={styles.formText}>first_name is: {formValues.first_name}</Text>
          <Text style={styles.formText}>last_name is: {formValues.last_name}</Text>
          <Text style={styles.formText}>Roles is: {formValues.roles}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
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
