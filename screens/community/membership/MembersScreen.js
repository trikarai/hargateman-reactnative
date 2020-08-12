import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { ActivityIndicator, Button } from "react-native-paper";

import Colors from "../../../constants/colors";
import * as communitiesAction from "../../../store/actions/community";
import MemberItem from "../../../components/community/communityMemberItem";

const MembersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const communityId = props.navigation.getParam("communityId");

  const members = useSelector((state) => state.communities.membersCommunities);

  const asu = JSON.stringify(members);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [error]);

  const loadMembers = useCallback(async () => {
    setError(null);
    setIsError(false);
    setIsRefreshing(true);
    try {
      await dispatch(communitiesAction.fecthCommunityMembers(communityId));
    } catch (err) {
      setError(err.message);
      setIsError(true);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadMembers);
    return () => {
      willFocusSub.remove();
    };
  }, [loadMembers]);

  useEffect(() => {
    setIsLoading(true);
    loadMembers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadMembers, setIsLoading]);

  const onSetAdminHandler = async (id) => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(
        communitiesAction.setAdminCommunityMember(communityId, id)
      );
      loadMembers();
    } catch (err) {
      setError(err.message);
      setIsRefreshing(false);
    }
  };
  const onRemoveHandler = async (id) => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(
        communitiesAction.removeCommunityMember(communityId, id)
      );
      loadMembers();
    } catch (err) {
      setError(err.message);
      setIsRefreshing(false);
    }
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadMembers}>
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
        <FlatList
          onRefresh={loadMembers}
          refreshing={isRefreshing}
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <MemberItem
              name={itemData.item.memberName}
              admin={itemData.item.admin}
              active={itemData.item.active}
              joinTime={itemData.item.joinTime}
              onSetAdmin={() => {
                onSetAdminHandler(itemData.item.memberId);
              }}
              onRemove={() => {
                onRemoveHandler(itemData.item.memberId);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default MembersScreen;

MembersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Community Members",
  };
};

const styles = StyleSheet.create({
  create: {
    margin: 5,
  },
});
