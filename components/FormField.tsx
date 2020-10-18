import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const FormField = (props : any) => {
  return (
    <View style={styles.formFieldWrapper}>
      <View style={styles.textWrapper}>  
        <View style={styles.horizontalSplit}>
          <View style={styles.horizontalColumn}>
          <Text style={styles.labelText}>{props.label}</Text>
          </View>
          <View style={styles.horizontalColumn}>
            <TextInput
                placeholder={props.placeholder}
                style={styles.formFieldText}
                onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
                {...props.textInputProps}
            /> 
          </View>
        </View>
      </View>
    </View>


    
  )
}


const styles = StyleSheet.create({
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
  text: {
    fontSize: 18,
    marginVertical: 8
  },
  formFieldWrapper: {
    marginBottom: 7,
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

export default FormField
