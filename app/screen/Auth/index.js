//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions
} from "react-native";

import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");

const porcenteComponentWidth = width * 0.8;

class Auth extends Component {
  state = {
    name: "",
    email: "",
    cpf: "",
    password: "",
    status: undefined
  };
  

  async sendUser() {
    const { navigation , request } = this.props;
    const { name, email, cpf, password } = this.state;

    if(!request){
      navigation.navigate("List");
      return "";
    }

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("cpf", cpf);
    data.append("password", password);

    await fetch("http://10.0.2.2:8000/api/user/insert", {
      method: "POST",
      headers: {
        Accept: "application/json",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      },
      body: data
    })
      .then(response => response.json())
      .then(response => {
        navigation.navigate("List");
      })
      .catch(error => {
        this.setState({ status: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.inputText}
          underlineColorAndroid="#ccc"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputText}
          underlineColorAndroid="#ccc"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="Cpf"
          style={styles.inputText}
          underlineColorAndroid="#ccc"
          onChangeText={cpf => this.setState({ cpf })}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputText}
          underlineColorAndroid="#ccc"
          onChangeText={password => this.setState({ password })}
        />
        <Text>{this.state.status}</Text>
        <View style={{ width: porcenteComponentWidth }}>
          <Button
            onPress={this.sendUser.bind(this)}
            title="Entrar"
            style={styles.button}
            color="#65ff70"
          />
        </View>
      </View>
    );
  }
}

const mapStateProps = (state) => ({
  request : state.posts.request
})

export default connect(mapStateProps)(Auth)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  inputText: {
    height: 60,
    marginBottom: 10,
    width: porcenteComponentWidth
  },
  button: {
    height: 60,
    flex: 1,
    shadowColor: "transparent"
  }
});
