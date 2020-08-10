import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, StyleSheet, Alert, View, Text } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

import Colors from "../../../constants/colors";
import * as communitiesAction from "../../../store/actions/community";
import ApplicantItem from "../../../components/community/communityApplicantItem";

const ApplicantsScreen = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const communityId = props.navigation.getParam("communityId");

  const communities = useSelector(
    (state) => state.communities.applicationsCommunities
  );

  const asu = JSON.stringify(communities);

  const dispatch = useDispatch();

  const loadApplicants = useCallback(async () => {
    setIsError(null);
    setIsRefreshing(true);
    try {
      await dispatch(communitiesAction.fecthCommunityApplicants(communityId));
    } catch (err) {
      console.log(err);
      setIsError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsloading, setIsError, setIsRefreshing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadApplicants
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadApplicants]);

  useEffect(() => {
    setIsloading(true);
    loadApplicants().then(() => {
      setIsloading(false);
    });
  }, [dispatch, loadApplicants]);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadApplicants}>
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
          onRefresh={loadApplicants}
          refreshing={isRefreshing}
          data={communities}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ApplicantItem
              id={itemData.item.id}
              name={itemData.item.userName}
              appliedTime={itemData.item.appliedTime}
              onAccept={() => {}}
              onReject={() => {}}
            />
          )}
        />
      </View>
    );
  }
};

export default ApplicantsScreen;

ApplicantsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Communities Applicants",
  };
};

const styles = StyleSheet.create({
  create: {
    margin: 5,
  },
});