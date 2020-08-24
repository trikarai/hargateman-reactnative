import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  ActivityIndicator,
  Button,
  Paragraph,
  Portal,
  FAB,
  TextInput,
  Caption,
} from "react-native-paper";

import Colors from "../../../constants/colors";
import * as threadActions from "../../../store/actions/thread";

import ThreadCommentItem from "../../../components/thread/ThreadCommentItem";

const CommunityThreadCommentsScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const threadId = props.navigation.getParam("threadId");
  const threadTitle = props.navigation.getParam("threadTitle");
  const [content, setContent] = useState("");
  const [isRefresing, setisRefresing] = useState(false);
  const [isCommentLoading, setisCommentLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState();
  const [isError, setisError] = useState(false);
  const [isComment, setisComment] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

  const comments = useSelector((state) => state.thread.comments);

  const dispatch = useDispatch();

  const loadComments = useCallback(async () => {
    setErrorMsg(null);
    setisRefresing(true);
    try {
      await dispatch(threadActions.fetchComments(communityId, threadId));
    } catch (error) {
      setErrorMsg(error.message);
      setisError(true);
    }
    setisRefresing(false);
  }, [dispatch, setErrorMsg, setisError, setisRefresing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadComments
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadComments]);

  useEffect(() => {
    setisCommentLoading(true);
    loadComments().then(() => {});
    setisCommentLoading(false);
  }, [dispatch, loadComments, setisCommentLoading]);

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [dispatch, ErrorMsg]);

  const sendCommentHandler = async () => {
    setisSubmit(true);
    setErrorMsg(null);
    try {
      await dispatch(threadActions.postComment(communityId, threadId, content));
    } catch (error) {
      setErrorMsg(error.message);
    }
    setisSubmit(false);
    setisComment(false);
  };

  return (
    <View>
      <View>
        {/* thread detail */}
        <Card>
          <Card.Title title={threadTitle} />
          <Card.Content>
            <Paragraph>content</Paragraph>
          </Card.Content>
        </Card>
        {/* thread comment input */}
        {isComment ? (
          <View>
            <TextInput
              disabled={isSubmit}
              style={styles.commentBox}
              label="Comment"
              placeholder="type comment here..."
              autoFocus={true}
              value={content}
              multiline={true}
              numberOfLines={4}
              onChangeText={(content) => setContent(content)}
            />
            {isSubmit ? (
              <View>
                <ActivityIndicator
                  style={{ margin: 10 }}
                  size="large"
                  color={Colors.primary}
                />
              </View>
            ) : (
              <View>
                <Button
                  icon="send"
                  mode="contained"
                  color={Colors.primary}
                  onPress={() => {
                    sendCommentHandler();
                  }}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginTop: 10 }}
                  icon="close"
                  mode="contained"
                  color={Colors.warning}
                  onPress={() => {
                    setisComment(false);
                    setContent("");
                  }}
                >
                  Cancel
                </Button>
              </View>
            )}
          </View>
        ) : (
          <View>{/* <Text>test</Text> */}</View>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Caption style={{ marginStart: 5 }}>Thread Comments</Caption>
        <FlatList
          onRefresh={loadComments}
          refreshing={isRefresing}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ThreadCommentItem
              userName={itemData.item.userName}
              content={itemData.item.content}
              submitTime={itemData.item.submitTime}
            />
          )}
        />
      </View>
      <Portal>
        <FAB
          visible={!isComment}
          label="comment"
          style={styles.fab}
          small
          icon="comment"
          onPress={() => {
            setisComment(true);
          }}
        />
      </Portal>
    </View>
  );
};

export default CommunityThreadCommentsScreen;
CommunityThreadCommentsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Thread Comments",
  };
};
const styles = StyleSheet.create({
  commentBox: {
    margin: 5,
  },
  fab: {
    position: "absolute",
    backgroundColor: Colors.primary,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
