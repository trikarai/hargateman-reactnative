import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, StyleSheet, Alert } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

import Colors from "../../constants/colors";
import * as communitiesAction from "../../store/actions/community";

const CommunityDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const communityId = props.navigation.getParam("communityId");
  const community_detail = useSelector(
    (state) => state.communities.detailCommunity
  );
  const asu = JSON.stringify(community_detail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
    dispatch(communitiesAction.detailCommunities(communityId));
  }, [dispatch, error]);

  const applyHandler = () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(communitiesAction.applyCommunities(communityId));
      props.navigation.navigate("Community");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>{props.navigation.getParam("communityName")}</Title>
          <Paragraph>{asu}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Button
              color={Colors.primary}
              mode="contained"
              onPress={applyHandler}
            >
              Apply
            </Button>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default CommunityDetailScreen;

CommunityDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("communityName"),
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});
