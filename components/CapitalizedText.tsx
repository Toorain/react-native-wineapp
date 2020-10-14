import {Text, View} from "react-native";
import React from "react";

const CapitalizedText = (props: any) => {
  let text = props.children.slice(0, 1).toUpperCase() + props.children.slice(1, props.children.length);

  return (
    <View>
      <Text style={props.style}>{text}</Text>
    </View>
  )
}

export default CapitalizedText;
