import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

import Colors from "../../constants/colors";
import * as communitiesAction from "../../store/actions/community";

import CommunityItem from "../../components/community/communityItem";

const CommunityScreen = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const communities = useSelector(
    (state) => state.communities.availableCommunities
  );
  const dispatch = useDispatch();

  const loadCommunities = useCallback(async () => {
    setIsError(null);
    setIsRefreshing(true);
    try {
      await dispatch(communitiesAction.fetchCommunities());
    } catch (err) {
      setIsError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsloading, setIsError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCommunities
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadCommunities]);

  useEffect(() => {
    setIsloading(true);
    loadCommunities().then(() => {});
    setIsloading(false);
  }, [dispatch, loadCommunities]);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("CommunityDetail", {
      communityId: id,
      communityName: name,
    });
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadCommunities}>
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
        <View style={styles.create}>
          <Button
            mode="contained"
            onPress={() => {
              props.navigation.navigate("CommunityApplications");
            }}
          >
            Communities Applications
          </Button>
        </View>
        <FlatList
          onRefresh={loadCommunities}
          refreshing={isRefreshing}
          data={communities}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CommunityItem
              id={itemData.item.communityId}
              name={itemData.item.communityName}
              onSelect={() => {
                selectItemHandler(
                  itemData.item.communityId,
                  itemData.item.communityName
                );
              }}
            />
          )}
        />
      </View>
    );
  }
};

CommunityScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Available Communities",
  };
};

const styles = StyleSheet.create({
  create: {
    margin: 5,
  },
  button: {
    marginBottom: 10,
  },
});

export default CommunityScreen;
