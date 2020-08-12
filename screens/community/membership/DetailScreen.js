import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, StyleSheet, Alert, View } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

import Colors from "../../../constants/colors";
import * as communitiesAction from "../../../store/actions/community";

const CommunityDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const communityId = props.navigation.getParam("communityId");
  const communityName = props.navigation.getParam("communityName");
  const community_detail = useSelector(
    (state) => state.communities.detailCommunity
  );
  const asu = JSON.stringify(community_detail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [dispatch, error]);

  const applyHandler = () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(communitiesAction.leaveCommunities(communityId));
      props.navigation.navigate("CommunityMembership");
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
          {/* <Paragraph>{asu}</Paragraph> */}
        </Card.Content>
        <Card.Actions>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Button
                style={{ marginEnd: 10 }}
                color={Colors.error}
                mode="contained"
                onPress={applyHandler}
              >
                Leave
              </Button>
              <Button
                mode="contained"
                color={Colors.primary}
                onPress={() => {
                  props.navigation.navigate("CommunityGroupMembership", {
                    communityId: communityId,
                    communityName: communityName,
                  });
                }}
              >
                Group
              </Button>
            </View>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default CommunityDetailScreen;

CommunityDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Community Detail",
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});
