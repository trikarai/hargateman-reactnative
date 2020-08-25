import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Paragraph } from "react-native-paper";

import Colors from "../../constants/colors";

const PersonalStoreItem = (props) => {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title title={props.name} />
      <Card.Actions>
        <Button
          mode="contained"
          color={Colors.primary}
          onPress={props.gotoGoods}
        >
          Goods
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default PersonalStoreItem;

const styles = StyleSheet.create({});
