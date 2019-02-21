import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import { NavigationActions } from "react-navigation";

import { connect } from "react-redux";

import { Icon, Button } from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const navigateAction = post => {
  return NavigationActions.navigate({
    routeName: "Add",
    params: post,
    action: NavigationActions.navigate({ routeName: "Add" })
  });
};

class ListPosts extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarIcon: ({ focused }) => {
        return <Icon name="list" color="#ccc" size={30} />;
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { requestPosts, posts } = this.props;
    if (posts > 0) {
      console.warn("acima de posts");
    } else {
      await fetch(`http://10.0.2.2:8000/api/user/post/all/${1}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => {
          console.warn(response);
          requestPosts(response);
        });
    }
  }

  render() {
    const { posts, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          style={{ width, height: 70, backgroundColor: "yellow" }}
          title={"reset App"}
          onPress={() => navigation.navigate("FingerPrint")}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          data={posts}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.dispatch(navigateAction(item));
              }}
            >
              <View style={styles.cardList}>
                <Text style={styles.cardListTilte}>{item.title}</Text>
                <Icon name="chevron-right" color="#ccc" size={25} />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}

const mapStateProps = state => ({
  posts: state.posts.posts
});

const mapDispatchProps = dispatch => {
  return {
    requestPosts: posts => {
      dispatch({
        type: "REQUEST_POSTS",
        posts
      });
    }
  };
};

export default connect(
  mapStateProps,
  mapDispatchProps
)(ListPosts);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  cardList: {
    width,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
