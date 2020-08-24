import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Caption,
  Paragraph,
  FAB,
  Subheading,
  TextInput,
} from "react-native-paper";
import Colors from "../../constants/colors";

const ThreadCommentItem = (props) => {
  const [content, setContent] = useState("");
  const [isReply, setisReply] = useState(false);

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
          {isReply ? (
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
              <Button
                icon="close"
                onPress={() => {
                  setisReply(false);
                  setContent("");
                }}
              >
                cancel
              </Button>
            </View>
          ) : (
            <View></View>
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
