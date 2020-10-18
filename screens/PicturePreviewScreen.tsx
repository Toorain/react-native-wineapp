import React from "react";
import {View, Image, StyleSheet, Dimensions, Button, Alert} from "react-native";

const PicturePreview = ({navigation, route}: any) => {
  const picture = route.params;
  console.log(picture.picture);

  return (

    <View style={{flex: 1, alignItems: "center"}}>
      <Image source={{ uri: picture.picture }} style={styles.preview} />
      <View style={{ marginTop: 30}}>
        <Button title={'Ajouter la photo'} onPress={() => {
          Alert.alert('Ajouter une photo',
            'Ajouter pour bouteille ou étiquette ?',
            [
              { text: 'Bouteille', onPress: () => {

                }},
              { text: 'Etiquette', onPress: () => {

                } },
              { text: 'Annuler', onPress: () => {
                  console.log('cancel');
                }},
              ])
        }} />
      </View>
    </View>
  )
}

const { width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight - 200,
    width: winWidth - 200,
  }
})

export default PicturePreview;
