import {View, StyleSheet, Image, Text} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

const AdminScreen = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);

  return (
    <View style={styles.center}>
      <View><Text>Admin page</Text></View>

    </View>
  )
}

const styles = StyleSheet.create({
  bottleText: {
    marginBottom: 50,
    fontSize: 30,
    textAlign: "center"
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: '100%'
  },
  imageBig: {
    height: '70%',
    width: '70%',
    resizeMode: "contain",
  }
});

export default AdminScreen