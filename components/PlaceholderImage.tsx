import { StyleSheet, Image } from "react-native";
import React from "react";

const Placeholder = (props: any) => {
  return(
    <Image
      style={props.style}
      source={require('../assets/images/bouteillePlaceholder.png')}
    />
  )
}

const styles = StyleSheet.create({
});

export default Placeholder
