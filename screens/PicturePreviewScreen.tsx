import React from "react";
import {View, Image, StyleSheet, Dimensions, Button, Alert, ScrollView} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const PicturePreview = ({navigation, route}: any) => {
  const picture: any = route.params;
  const [token, setToken]: any = React.useState('');
  const [_id, setId]: any = React.useState('');

  AsyncStorage.getItem('token').then(tokenValue => {
    return setToken(tokenValue);
  });

  AsyncStorage.getItem('_id').then(_idValue => {
    return setId(_idValue);
  });

  const sendPicture = async (element: string) => {
    let urlElm = '';
    element === 'bottle'
      ? urlElm = 'http://146.59.156.251:3000/products/uploadBottleImg/'
      : urlElm = 'http://146.59.156.251:3000/products/uploadLabelImg/';

    let fileName = picture.picture.split('/').pop();

    let match = /\.(\w+)$/.exec(fileName);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    //@ts-ignore
    formData.append('file', {uri: picture.picture, name: fileName, type});

    await fetch(urlElm + _id, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
        }
      }
    )
  }

  return (

    <ScrollView contentContainerStyle={{flex: 1, alignItems: "center"}}>
      <Image source={{ uri: picture.picture }} style={styles.preview} />
      <View style={{ marginTop: 30}}>
        <Button title={'Ajouter la photo'} onPress={() => {
          Alert.alert('Ajouter une photo',
            'Ajouter pour bouteille ou étiquette ?',
            [
              { text: 'Bouteille', onPress: () => {
                sendPicture('bottle').then(res => {
                  navigation.navigate('Products');
                });
              }},
              { text: 'Etiquette', onPress: () => {
                  sendPicture('label').then(res => {
                    navigation.navigate('Products');
                  });
              }},
              { text: 'Annuler', onPress: () => {
                console.log('cancel');
              }},
              ])
        }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  preview: {
    height: 480,
    width: 340,
  }
})

export default PicturePreview;
