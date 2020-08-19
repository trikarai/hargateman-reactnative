import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";

const ThreadItem = (props) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{JSON.stringify(props)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button color={Colors.primary} mode="contained" onPress={props.onView}>
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ThreadItem;

const styles = StyleSheet.create({
  card: {
    margin: 7,
  },
});
