import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

import Colors from "../../constants/colors";
import CommunityItem from "../../components/community/communityApplicationItem";
import * as communitiesAction from "../../store/actions/community";

const CommunityApplicationScreen = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const communities = useSelector(
    (state) => state.communities.applicationsCommunities
  );

  const asu = JSON.stringify(communities);

  const dispatch = useDispatch();

  const loadCommunities = useCallback(async () => {
    setIsError(null);
    setIsRefreshing(true);
    try {
      await dispatch(communitiesAction.fecthCommunityApplications());
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

  const cancelItemHandler = (id) => {
    // Alert.alert("An Error Occured", id, [{ text: "OK" }]);
    setIsError(null);
    setIsRefreshing(true);
    try {
      dispatch(communitiesAction.cancelCommunityApplication(id));
      props.navigation.navigate("CommunityApplications");
      setIsRefreshing(false);
    } catch (err) {
      setIsError(err.message);
      setIsRefreshing(false);
    }
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
      <View style={styles.create}>
        <FlatList
          onRefresh={loadCommunities}
          refreshing={isRefreshing}
          data={communities}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CommunityItem
              id={itemData.item.communityId}
              name={itemData.item.communityName}
              notes={itemData.item.communityNotes}
              onCancel={() => {
                cancelItemHandler(itemData.item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default CommunityApplicationScreen;

CommunityApplicationScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Community Applications",
  };
};

const styles = StyleSheet.create({
  create: {
    margin: 5,
  },
});
