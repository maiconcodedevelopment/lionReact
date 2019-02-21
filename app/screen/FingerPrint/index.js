/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  DeviceEventEmitter,
  NativeModules,
  Alert
} from "react-native";

import FingerprintScanner from "react-native-fingerprint-scanner";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    status: "Scan your finger",
    errorMessage: undefined
  };

  onFingerPrint() {

    const { navigation } = this.props

    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttempted
    })
      .then(() => {
        this.setState({
          status: "Successfull !!!"
        });
        Alert.alert("success !!!", "Device Lock Success.", [
          {
            text: "ok",
            onPress: () => {
              navigation.navigate("Auth")
            }
          }
        ]);
      })
      .catch(error => {
        this.setState({ status: error.message });
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = error => {
    this.setState({ errorMessage: error.message });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={this.onFingerPrint.bind(this)}>
          <View style={styles.finterIcon}>
            <Image
              style={styles.icon}
              source={require("../../assets/fingerprint.png")}
            />
          </View>
        </TouchableNativeFeedback>

        <Text style={styles.welcome}>{this.state.errorMessage}</Text>
        <Text style={styles.instructions}>{this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  finterIcon: {
    width: 62,
    height: 62,
    borderRadius: 100,
    padding: 12,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 100,
    borderRadius: 100
  }
});
