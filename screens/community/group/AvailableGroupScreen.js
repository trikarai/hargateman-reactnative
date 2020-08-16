import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Alert, View, Text } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Colors from "../../../constants/colors";

import * as groupAction from "../../../store/actions/group";

import GroupItem from "../../../components/group/availableGroup";

const AvailableGroupScreen = (props) => {
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
      await dispatch(groupAction.fetchGroup(communityId));
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

  const onApplyHandler = async (id) => {
    setError(false);
    setLoading(true);
    try {
      await dispatch(groupAction.applyGroup(communityId, id)).then(() => {
        loadGroups();
      });
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
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
      <View style={styles.create}>
        <View>
          <Button
            style={{ margin: 10 }}
            mode="contained"
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate("CommunityGroupApplication", {
                communityId: communityId,
                communityName: communityName,
              });
            }}
          >
            Group Applications
          </Button>
          {/* <Text>{asu}</Text> */}
        </View>
        <FlatList
          onRefresh={loadGroups}
          refreshing={isRefreshing}
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GroupItem
              id={itemData.item.id}
              name={itemData.item.name}
              onApply={() => {
                onApplyHandler(itemData.item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default AvailableGroupScreen;

AvailableGroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Available Community Groups",
  };
};

const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});
