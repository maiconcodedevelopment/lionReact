import {
  createStackNavigator,
  createTabNavigator,
  createBottomTabNavigator,
  createNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import { Icon } from "react-native-elements";

import FingerPrint from "../screen/FingerPrint";
import Auth from "../screen/Auth";

import App from "../screen/ListPosts";
import AddPost from "../screen/AddPost";

const authApp = createStackNavigator(
  {
    FingerPrint: {
      screen: FingerPrint,
      navigationOptions: {
        header: null
      }
    },
    Auth: {
      screen: Auth,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "FingerPrint"
  }
);

const listApp = createBottomTabNavigator(
  {
    App: {
      screen: App,
      navigationOptions: {
        tabBarLabel: "List Posts"
      }
    },
    Add: {
      screen: AddPost,
      navigationOptions: {
        tabBarLabel: "Add Post"
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "App") {
          console.warn("sim");
          iconName = "list";
        } else if (routeName == "Add") {
          console.warn("nao");
          iconName = "plus";
        }

        return <Icon name={"rowing"} size={25} color="#ccc" />;
      }
    })
  }
);

export let Router = createAppContainer(
  createSwitchNavigator(
    {
      Auth: authApp,
      List: listApp
    },
    {
      initialRouteName: "Auth"
    }
  )
);
