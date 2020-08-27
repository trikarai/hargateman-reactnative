import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Caption,
  Paragraph,
  FAB,
  Subheading,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import Colors from "../../constants/colors";

import * as threadActions from "../../store/actions/thread";

const ThreadCommentItem = (props) => {
  const [content, setContent] = useState("");
  const [isReply, setisReply] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const replyHandler = async () => {
    console.log("Content :" + content);
    try {
      await dispatch(
        threadActions.replyComment(
          props.communityId,
          props.threadId,
          props.threadPostId,
          content
        )
      );
    } catch (error) {}
  };

  return (
    <View>
      <Card elevation={2} style={styles.card}>
        <Card.Content>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Subheading>{props.userName}</Subheading>
            <Text> . </Text>
            <Caption>{props.submitTime}</Caption>
          </View>
          <Paragraph>{props.content}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {/* <Button  icon="reply" mode="contained"></Button> */}
          {!isReply ? (
            <FAB
              style={styles.fab}
              small
              icon="reply"
              onPress={() => {
                props.onReply();
                setisReply(true);
              }}
              label=""
            />
          ) : (
            <View></View>
          )}
          {/* <FAB style={{backgroundColor: Colors.error}} small icon="delete" onPress={() => {}} /> */}
        </Card.Actions>
        <Card.Content>
          {isReply && (
            <View>
              <TextInput
                label="Reply"
                placeholder="type reply here..."
                autoFocus={true}
                value={content}
                multiline={true}
                numberOfLines={4}
                onChangeText={(content) => setContent(content)}
              />
              {isLoading ? (
                <View>
                  <ActivityIndicator
                    style={{ margin: 5 }}
                    color={Colors.primary}
                    size="large"
                  />
                </View>
              ) : (
                <View>
                  <Button
                    style={{ margin: 5 }}
                    color={Colors.primary}
                    mode="contained"
                    icon="share"
                    onPress={() => {
                      replyHandler(content);
                    }}
                  >
                    Reply
                  </Button>
                  <Button
                    style={{ margin: 5 }}
                    icon="close"
                    color={Colors.error}
                    onPress={() => {
                      props.onReply();
                      setisReply(false);
                      setContent("");
                    }}
                  >
                    cancel
                  </Button>
                </View>
              )}
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default ThreadCommentItem;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.primary,
  },
  card: {
    margin: 5,
  },
});
