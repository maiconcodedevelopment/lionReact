import React, { Component } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";

import { Icon, Button } from "react-native-elements";
import { requestPost } from "../../redux/actions/Posts/actionTypes";

import { NavigationActions } from "react-navigation";

import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");

class AddPost extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: navigation.getParam("title", "New Post"),
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.dispatch(
          NavigationActions.navigate({
            routeName: "Add",
            params: { id: 0, title: "", description: "" },
            action: NavigationActions.navigate({ routeName: "Add" })
          })
        );
      },
      tabBarIcon: ({ focused }) => {
        return <Icon name="add" color="#ccc" size={30} />;
      }
    };
  };

  state = {
    id: 0,
    title: "",
    description: ""
  };

  componentWillReceiveProps(nextProps) {
    console.warn(nextProps);
    console.warn(this.props);

    if (
      nextProps.navigation.state.params !== this.props.navigation.state.params
    ) {
      this.setState({
        id: nextProps.navigation.getParam("id", 0),
        title: nextProps.navigation.getParam("title", ""),
        description: nextProps.navigation.getParam("description", "")
      });
    }
  }

  componentDidMount() {
    console.warn(this.props);
  }

  componentWillMount() {}

  componentWillUpdate() {}

  componentDidUpdate(prevProps, prevState) {
    // console.warn(this.props);
  }

  updateParams() {
    const { title, description } = this.props.navigation.state.params;
    this.setState({ title, description });
  }

  async onDelete() {
    const { deletePost, navigation, request } = this.props;
    const { params } = navigation.state;

    if (!request) {
      deletePost(params.id);
      navigation.goBack();
      return "";
    }

    console.warn(params.id);

    await fetch(`http://10.0.2.2:8000/api/user/post/delete/${params.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(response => {
        console.warn(response);
        deletePost(response.id);
        navigation.goBack();
      });
  }

  async onSalve() {
    const { dispatch, addPost, navigation, request, posts } = this.props;
    const { title, description, id } = this.state;

    let i = 1;

    if (posts.length > 0) {
      i = posts[posts.length - 1].id;
      ++i;
    }

    if (id !== 0) {
      i = id;
    }

    if (!request) {
      addPost({ title, description, id: i });
      navigation.goBack();
      return "";
    }

    let data = new FormData();
    data.append("iduser", 1);
    data.append("idpost", id);
    data.append("title", title);
    data.append("description", description);

    await fetch("http://10.0.2.2:8000/api/user/post/add", {
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
        addPost(response);
        navigation.goBack();
      });
  }

  render() {
    const { title, description, id } = this.state;
    const { navigation } = this.props;

    let titleparam = navigation.getParam("title", false);
    let descriptionparam = navigation.getParam("description", false);

    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TextInput
            style={[styles.textInput, { marginBottom: 20 }]}
            placeholder="Title"
            value={title}
            onChangeText={title => this.setState({ title })}
            underlineColorAndroid="#ccc"
          />
          <TextInput
            style={[styles.textInput, { borderColor: "#ccc", borderWidth: 1 }]}
            onChangeText={description => this.setState({ description })}
            value={description}
            placeholder="Description"
            editable={true}
            multiline={true}
            numberOfLines={4}
            maxLength={255}
          />
        </View>
        <View style={styles.containerBottom}>
          {id === 0 ? null : (
            <Button
              onPress={this.onDelete.bind(this)}
              buttonStyle={[styles.button, { backgroundColor: "#fa393c" }]}
              icon={<Icon name="close" color="white" size={35} />}
              title="Excluir Post"
            />
          )}

          <Button
            onPress={this.onSalve.bind(this)}
            buttonStyle={[styles.button, { backgroundColor: "#314aed" }]}
            icon={<Icon name="check" color="white" size={35} />}
            title="Salvar Post"
          />
        </View>
      </View>
    );
  }
}

const mapStatePorps = state => ({
  request: state.posts.request,
  posts: state.posts.posts
});

const mapDispachProps = dispatch => {
  return {
    addPost: post => {
      dispatch({ type: "REQUEST_ADD_POST", post: post });
    },
    deletePost: id => {
      dispatch({ type: "REQUEST_DELETE_POST", id });
    }
  };
};

export default connect(
  mapStatePorps,
  mapDispachProps
)(AddPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  textInput: {
    width: width * 0.8,
    height: 60
  },
  button: {
    width: width,
    backgroundColor: "#fa393c",
    height: 80,
    borderRadius: 0
  },
  containerTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerBottom: {}
});
