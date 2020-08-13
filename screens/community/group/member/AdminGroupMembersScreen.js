import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Alert } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";

import Colors from "../../../../constants/colors";

import * as groupActions from "../../../../store/actions/group";

import GroupMemberItem from "../../../../components/group/asAdminGroupMemberItem";

const AdminGroupMembersScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const communityName = props.navigation.getParam("communityName");
  const groupId = props.navigation.getParam("groupId");
  const groupName = props.navigation.getParam("groupName");

  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, seterrorMsg] = useState();

  const dispatch = useDispatch();

  const members = useState((state) => state.groups.members);
  const asu = JSON.stringify(members);

  const loadMembers = useCallback(async () => {
    setisRefreshing(true);
    setisError(false);
    try {
      await dispatch(groupActions.fetchasAdminGroupMembers(communityId, groupId));
    } catch (error) {
      seterrorMsg(error.message);
    }
  }, [dispatch, setisRefreshing, setisError, seterrorMsg]);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("An Error Occured", errorMsg, [{ text: "OK" }]);
    }
  }, [dispatch, errorMsg]);

  useEffect(() => {
    setisLoading(true);
    loadMembers().then(() => {
      setisLoading(false);
    });
  }, [setisLoading, loadMembers]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willfocus", loadMembers);
    return () => {
      willFocusSub.remove();
    };
  }, [loadMembers]);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={() => {}}>
          Try Again
        </Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={Colors.primary}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{asu}</Text>
      </View>
    );
  }
};

export default AdminGroupMembersScreen;

AdminGroupMembersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("groupName") + "Members",
  };
};

const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});
