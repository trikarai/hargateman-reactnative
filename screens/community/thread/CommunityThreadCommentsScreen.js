import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  Card,
  ActivityIndicator,
  Button,
  Paragraph,
  Portal,
  FAB,
  TextInput,
} from "react-native-paper";

import Colors from "../../../constants/colors";
import * as threadActions from "../../../store/actions/thread";

const CommunityThreadCommentsScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const threadId = props.navigation.getParam("threadId");
  const threadTitle = props.navigation.getParam("threadTitle");
  const [content, setContent] = useState("");
  const [ErrorMsg, setErrorMsg] = useState();
  const [isError, setisError] = useState(false);
  const [isComment, setisComment] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

  const dispatch = useDispatch();

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
        <Card>
          <Card.Title title={threadTitle} />
          <Card.Content>
            <Paragraph>content</Paragraph>
          </Card.Content>
        </Card>
        {isComment ? (
          <View>
            <TextInput
              disabled={isSubmit}
              style={styles.commentBox}
              label="Comment"
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
          <View></View>
        )}
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
