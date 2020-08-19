import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import {
  FAB,
  ActivityIndicator,
  Card,
  Portal,
  Button,
} from "react-native-paper";

import ThreadItem from "../../../components/thread/ThreadItem";

import Colors from "../../../constants/colors";
import * as threadAction from "../../../store/actions/thread";

const CommuntyThreadsScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");

  const [isLoading, setisLoading] = useState(false);
  const [isRefresing, setisRefresing] = useState(false);
  const [isError, setisError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState();

  const dispatch = useDispatch();

  const threads = useSelector((state) => state.thread.threads);

  const loadThreads = useCallback(async () => {
    setErrorMsg(null);
    setisRefresing(true);
    try {
      await dispatch(threadAction.fetchThreads(communityId));
    } catch (err) {
      setErrorMsg(err.message);
      setisError(true);
    }
    setisRefresing(false);
  }, [dispatch, setisLoading, setisRefresing, setErrorMsg]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadThreads);
    return () => {
      willFocusSub.remove();
    };
  }, [loadThreads]);

  useEffect(() => {
    setisLoading(true);
    loadThreads().then(() => {});
    setisLoading(false);
  }, [dispatch, loadThreads, setisLoading]);

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [ErrorMsg]);

  const onViewHandler = (threadId) => {
    props.navigation.navigate("CommunityThreadComments", { threadId: threadId });
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadThreads}>
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
      <ScrollView>
        <FlatList
          onRefresh={loadThreads}
          refreshing={isRefresing}
          data={threads}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ThreadItem
              threadId={itemData.item.id}
              title={itemData.item.title}
              closed={itemData.item.closed}
              submitTime={itemData.item.submitTime}
              userName={itemData.item.userName}
              onView={() => {
                onViewHandler(itemData.item.id);
              }}
            />
          )}
        />
        <Portal>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {
              console.log("fab pressed");
            }}
          />
        </Portal>
      </ScrollView>
    );
  }
};

export default CommuntyThreadsScreen;

CommuntyThreadsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Community Threads",
  };
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: Colors.primary,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
