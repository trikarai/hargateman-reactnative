import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";

const CommunityMemberItem = (props) => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.name}</Title>
        <Paragraph>Join Time: {props.joinTime}</Paragraph>
        {props.admin ? (
          <Paragraph>Admin</Paragraph>
        ) : (
          <Paragraph>not Admin</Paragraph>
        )}
        {props.active ? (
          <Paragraph>Active Member</Paragraph>
        ) : (
          <Paragraph>Not Active Member</Paragraph>
        )}
      </Card.Content>
      <Card.Actions>
        {!props.active ? (
          <Button
            style={{ marginEnd: 10 }}
            mode="contained"
            onPress={props.onRemove}
          >
            Remove
          </Button>
        ) : (
          <View></View>
        )}
        {!props.admin ? (
          <Button mode="outlined" onPress={props.onSetAdmin}>
            Set As Admin
          </Button>
        ) : (
          <View></View>
        )}
      </Card.Actions>
    </Card>
  );
};

export default CommunityMemberItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  status: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    marginVertical: 4,
  },
  action: {
    marginTop: 10,
  },
  cardContainer: {
    width: "95%",
    padding: 20,
    margin: 10,
  },
  button: {
    margin: 3,
  },
});
