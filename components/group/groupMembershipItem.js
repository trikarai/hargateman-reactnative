import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";

const groupMembershipItem = (props) => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.name}</Title>
      </Card.Content>
      <Card.Actions>
        <Button color={Colors.primary} mode="contained">
          Thread
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default groupMembershipItem;

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
