import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Alert, View, Text } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Colors from "../../../../constants/colors";

import * as groupAction from "../../../../store/actions/group";

import GroupMembershipItem from "../../../../components/group/groupMembershipItem";

const GroupScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const communityName = props.navigation.getParam("communityName");

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState();

  const dispatch = useDispatch();

  const groups = useSelector((state) => state.group.groups);
  const asu = JSON.stringify(groups);

  const loadGroups = useCallback(async () => {
    setError(false);
    setRefreshing(true);
    try {
      await dispatch(groupAction.fetchGroupMembership(communityId));
    } catch (err) {
      setError(true);
      setErrorMsg(err.message);
    }
    setRefreshing(false);
  }, [dispatch, setError, setErrorMsg, setRefreshing]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [dispatch, error]);

  useEffect(() => {
    setLoading(true);
    loadGroups().then(() => {
      setLoading(false);
    });
  }, [dispatch, loadGroups, setLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadGroups);
    return () => {
      willFocusSub.remove();
    };
  }, [loadGroups]);

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
      <View style={styles.create}>
        <View>
          <Button
            style={{ margin: 10 }}
            mode="contained"
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate("CommunityAvailableGroup", {
                communityId: communityId,
                communityName: communityName,
              });
            }}
          >
            Join Group
          </Button>
          {/* <Text>{asu}</Text> */}
        </View>
        {groups.length !== 0 ? (
          <FlatList
            onRefresh={loadGroups}
            refreshing={isRefreshing}
            data={groups}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <GroupMembershipItem
                id={itemData.item.id}
                name={itemData.item.name}
                admin={itemData.item.admin}
                admin={itemData.item.active}
                joinTime={itemData.item.joinTime}
              />
            )}
          />
        ) : (
          <View>
            <Text>No Group joined, please join by clicking button above</Text>
          </View>
        )}
      </View>
    );
  }
};

export default GroupScreen;

GroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("communityName") + " Group",
  };
};

const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});
