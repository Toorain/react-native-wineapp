import {Button, StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default class UserDetails extends Component<{}, { getValue: string | null }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      getValue: ''
    }
  }

  getValueFunction = () => {
    AsyncStorage.getItem('token').then(value => {
      this.setState({ getValue: value });
    })
  }

  componentDidMount() {
    this.getValueFunction();
  }

  render() {
    return (
      <View>
        <Text>{this.state.getValue}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
