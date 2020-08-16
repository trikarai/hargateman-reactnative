import React from "react";
import { Platform, View, AsyncStorage } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { Button } from "react-native-paper";

// state
import { useDispatch } from "react-redux";
import * as authAction from "../store/actions/auth";
// navigation
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

// screen
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

import AuthScreen from "../screens/guest/AuthScreen";
import SignupScreen from "../screens/guest/SignupScreen";
import StartupScreen from "../screens/StartupScreen";
// community screen
import CommunityScreen from "../screens/community/CommunityScreen";
import CommunityApplicationsScreen from "../screens/community/CommunityApplicationsScreen";
import CommunityMembershipScreen from "../screens/community/CommunityMembershipScreen";
import CommunityMembershipDetailScreen from "../screens/community/membership/DetailScreen";
import CommunityMembershipAdminDetailScreen from "../screens/community/admin/DetailScreen";
import CommunityDetailScreen from "../screens/community/CommunityDetailScreen";
import CreateCommunityScreen from "../screens/community/CreateCommunityScreen";
import CommunityGroupMembershipScreen from "../screens/community/group/member/GroupMembershipScreen";
import CommunityGroupApplicationScreen from "../screens/community/group/member/GroupApplicationScreen";
import CommunityAvailableGroupScreen from "../screens/community/group/AvailableGroupScreen";

// community as admin
import CommunityApplicantsScreen from "../screens/community/admin/ApplicantsScreen";
import CommunityMembersScreen from "../screens/community/membership/MembersScreen";
import CommunityGroupAdminScreen from "../screens/community/group/admin/GroupScreen";
// group admin
import AdminGroupApplicantsScreen from "../screens/community/group/member/AdminGroupApplicantsScreen";
// import AdminGroupMembersScreen from "../screens/community/group/member/AdminGroupMembersScreen";
import AdminCreateGroupScreen from "../screens/community/group/admin/GroupCreateScreen";

// other
import Colors from "./../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CommunityNavigator = createStackNavigator(
  {
    CommunityMembership: CommunityMembershipScreen,
    CommunityMembershipDetail: CommunityMembershipDetailScreen,
    CommunityMembershipAdminDetail: CommunityMembershipAdminDetailScreen,
    Community: CommunityScreen,
    CommunityDetail: CommunityDetailScreen,
    CreateCommunity: CreateCommunityScreen,
    CommunityApplications: CommunityApplicationsScreen,
    CommunityGroupMembership: CommunityGroupMembershipScreen,
    CommunityGroupApplication: CommunityGroupApplicationScreen,
    CommunityAvailableGroup: CommunityAvailableGroupScreen,

    // admin
    CommunityApplicants: CommunityApplicantsScreen,
    CommunityMembers: CommunityMembersScreen,
    CommunityGroup: CommunityGroupAdminScreen,
    // admin group
    AdminCreateGroup: AdminCreateGroupScreen,
    AdminGroupApplicants: AdminGroupApplicantsScreen,
    // AdminGroupMembers: AdminGroupMembersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <MaterialCommunityIcons
          name="google-circles-communities"
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Communities: CommunityNavigator,
    Products: ProductNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 10 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              mode="text"
              color={Colors.primary}
              onPress={() => {
                dispatch(authAction.logout());
                AsyncStorage.removeItem("userData");
                props.navigation.navigate("Auth");
              }}
            >
              Logout
            </Button>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Signup: SignupScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Product: ShopNavigator,
});

const App = createAppContainer(MainNavigator);

export default App;
