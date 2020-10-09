import { StyleSheet, Image } from "react-native";
import React from "react";

const Logo = () => {
  return(
    <Image
      style={styles.logo}
      source={require('../assets/images/winelogo.png')}
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: 50
  }
});

export default Logo
