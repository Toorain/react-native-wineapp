import React,  { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Platform, Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import {Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

export default class AddPicture extends React.Component<any, any> {
  camera: any = null;

  state = {
    picture: {},
    hasPermission: null,
    cameraType: Camera.Constants.Type.back
  };

  takePicture = async () => {
    if ( this.camera ) {
      let photo = await this.camera.takePictureAsync();
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
  }

  getPermissionAsync =  async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert ('Sorry, we need camera roll permissions to make this work !');
      }
    }

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState( { hasPermission: status === 'granted' });
  }

  async componentDidMount() {
    await this.getPermissionAsync();
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasPermission: status === 'granted'});
  }

  render() {
    const {hasPermission} = this.state;

    if (hasPermission === null) {
      return <View/>;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (<View style={{flex: 1}}>
        <Camera style={{flex: 1}} type={this.state.cameraType} ref={ref => {
          this.camera = ref;
        }}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20}}>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                left: '50%',
                backgroundColor: 'transparent'
              }}
              onPress={async () => {
                const picture: any = await this.camera.takePictureAsync();
                console.log(picture);
                this.props.navigation.navigate('PicturePreview', { picture: picture.uri});
              }}>
              <Icon name={'camera'} type={'font-awesome'} size={50} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: 'transparent'
              }}
              onPress={() => {
                this.pickImage();
              }}
            >
              <Icon name={'image'} type={'font-awesome'} size={50} color={'white'} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>)
    }
  }
}
const { width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
})
