import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card, Button, Paragraph } from "react-native-paper";
import { theme } from "../../App";

import Colors from "../../constants/colors";

const LeftContent = props => <Avatar.Icon {...props} icon="store" theme={theme} />

const PersonalStoreItem = (props) => {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title title={props.name} subtitle="Store Created : 25 June 2020" left={LeftContent} />
      <Card.Actions>
        <Button
          mode="text"
          color={Colors.primary}
          onPress={props.gotoGoods}
        >
          My Product
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default PersonalStoreItem;

const styles = StyleSheet.create({});
