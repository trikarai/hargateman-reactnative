import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";

const asAdminGroupItem = (props) => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.name}</Title>
      </Card.Content>
      <Card.Actions>
        <Button
          style={{ marginEnd: 10 }}
          color={Colors.primary}
          mode="contained"
        >
          Members
        </Button>
        <Button color={Colors.primary} mode="contained">
          Applicants
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default asAdminGroupItem;

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
