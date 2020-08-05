import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";
import * as communitiesAction from "../../store/actions/community";

const CommunityDetailScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const community_detail = useSelector(
    (state) => state.communities.detailCommunity
  );
  const asu = JSON.stringify(community_detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(communitiesAction.detailCommunities(communityId));
  }, [dispatch]);

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>{props.navigation.getParam("communityName")}</Title>
          <Paragraph>{asu}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button color={Colors.primary} mode="contained">
            Apply
          </Button>
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
