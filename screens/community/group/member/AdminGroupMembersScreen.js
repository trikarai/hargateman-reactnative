import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, Text, Alert, StyleSheet } from "react-native";
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

  const members = useSelector((state) => state.group.members);
  const asu = JSON.stringify(members);

  const loadMembers = useCallback(async () => {
    setisRefreshing(true);
    setisError(false);
    try {
      await dispatch(
        groupActions.fetchasAdminGroupMembers(communityId, groupId)
      );
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisRefreshing(false);
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

  const onRemoveHandler = async (memberId) => {
    setisLoading(true);
    try {
      await dispatch(
        groupActions.asAdminRemoveGroupMembers(communityId, groupId, memberId)
      ).finally(() => {
        loadMembers();
      });
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisLoading(false);
  };
  const onSetAdminHandler = async (memberId) => {
    setisLoading(true);
    try {
      await dispatch(
        groupActions.asAdminSetAdminGroupMembers(communityId, groupId, memberId)
      ).finally(() => {
        loadMembers();
      });
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisLoading(false);
  };

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
        <FlatList
          refreshing={isRefreshing}
          onRefresh={loadMembers}
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GroupMemberItem
              userName={itemData.item.userName}
              admin={itemData.item.admin}
              active={itemData.item.active}
              joinTime={itemData.item.joinTime}
              onRemove={() => {
                onRemoveHandler(itemData.item.id);
              }}
              onSetAdmin={() => {
                onSetAdminHandler(itemData.item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default AdminGroupMembersScreen;

AdminGroupMembersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("groupName") + " Members",
  };
};

const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});
