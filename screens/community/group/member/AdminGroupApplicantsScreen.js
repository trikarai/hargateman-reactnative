import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Alert, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";

import Colors from "../../../../constants/colors";

import * as groupActions from "../../../../store/actions/group";

import GroupApplicantItem from "../../../../components/group/asAdminGroupApplicantItem";

const AdminGroupApplicantsScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const communityName = props.navigation.getParam("communityName");
  const groupId = props.navigation.getParam("groupId");
  const groupName = props.navigation.getParam("groupName");

  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, seterrorMsg] = useState();

  const dispatch = useDispatch();

  const applicants = useSelector((state) => state.group.applicants);
  const asu = JSON.stringify(applicants);

  const loadApplicants = useCallback(async () => {
    setisRefreshing(true);
    setisError(false);
    try {
      await dispatch(
        groupActions.fetchasAdminGroupApplicants(communityId, groupId)
      );
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisRefreshing(false);
  }, [dispatch, setisRefreshing, setisError, seterrorMsg]);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("An Error Occured", errorMsg, [{ text: "OK" }]);
    }
  }, [dispatch, errorMsg]);

  useEffect(() => {
    setisLoading(true);
    loadApplicants().then(() => {
      setisLoading(false);
    });
  }, [setisLoading, loadApplicants]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willfocus",
      loadApplicants
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadApplicants]);

  const onAcceptHandler = async (id) => {
    setisLoading(true);
    try {
      await dispatch(
        groupActions.adminAcceptApplicant(communityId, groupId, id)
      ).finally(() => {
        loadApplicants();
      });
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisLoading(false);
  };
  const onRejectHandler = async (id) => {
    setisLoading(true);
    try {
      await dispatch(
        groupActions.adminRejectApplicant(communityId, groupId, id)
      ).finally(() => {
        loadApplicants();
      });
    } catch (error) {
      seterrorMsg(error.message);
    }
    setisLoading(false);
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
      <View>
        <FlatList
          onRefresh={loadApplicants}
          refreshing={isRefreshing}
          data={applicants}
          keyExtractor={(item) => item.applicantId}
          renderItem={(itemData) => (
            <GroupApplicantItem
              applicantId={itemData.item.applicantId}
              userId={itemData.item.userId}
              userName={itemData.item.userName}
              concluded={itemData.item.concluded}
              notes={itemData.item.notes}
              appliedTime={itemData.item.appliedTime}
              onAccept={() => {
                onAcceptHandler(itemData.item.applicantId);
              }}
              onReject={() => {
                onRejectHandler(itemData.item.applicantId);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default AdminGroupApplicantsScreen;

AdminGroupApplicantsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("groupName") + " Applicants",
  };
};

const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});
