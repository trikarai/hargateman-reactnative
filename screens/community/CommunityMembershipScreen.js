import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./../../components/UI/HeaderButton";

import CommunityItem from "../../components/community/communityMembershipItem";
import * as communitiesAction from "../../store/actions/community";
import colors from "../../constants/colors";

const CommunityApplicationScreen = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const communities = useSelector(
    (state) => state.communities.membershipCommunities
  );

  const asu = JSON.stringify(communities);

  const dispatch = useDispatch();

  const loadCommunities = useCallback(async () => {
    setIsError(null);
    setIsRefreshing(true);
    try {
      await dispatch(communitiesAction.fecthCommunityMemberships());
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
    props.navigation.navigate("CommunityMembershipDetail", {
      communityId: id,
      communityName: name,
    });
  };
  const selectItemManageHandler = (id, name) => {
    props.navigation.navigate("CommunityMembershipAdminDetail", {
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
      <View style={styles.create}>
        <Button
          style={{ marginBottom: 10 }}
          mode="contained"
          color={colors.primary}
          onPress={() => {
            props.navigation.navigate("CreateCommunity");
          }}
        >
          Create Communities
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          mode="contained"
          color={colors.primary}
          onPress={() => {
            props.navigation.navigate("Community");
          }}
        >
          Join Communities
        </Button>
        <FlatList
          onRefresh={loadCommunities}
          refreshing={isRefreshing}
          data={communities}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CommunityItem
              id={itemData.item.communityId}
              name={itemData.item.communityName}
              admin={itemData.item.anAdmin}
              active={itemData.item.active}
              onLeave={() => {
                selectItemHandler(
                  itemData.item.communityId,
                  itemData.item.communityName
                );
              }}
              onManage={() => {
                selectItemManageHandler(
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

export default CommunityApplicationScreen;

CommunityApplicationScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Community Membership",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  create: {
    margin: 5,
  },
});
