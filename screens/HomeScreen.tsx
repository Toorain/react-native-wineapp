import {Button, View, StyleSheet, Text} from "react-native";
import React from "react";
import {AuthContext} from "../App";

const HomeScreen = ({navigation}: any) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default HomeScreen
