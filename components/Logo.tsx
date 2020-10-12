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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 70,
    marginBottom: 20
  }
});

export default Logo
