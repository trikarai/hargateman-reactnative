import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Paragraph, Title, Button } from "react-native-paper";

const GoodItem = (props) => {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title title={props.name} subtitle={"stock: " + props.stock} />
      <Card.Content>
        <Text>Price : {props.price}</Text>
        <Text>condition : {props.condition}</Text>
      </Card.Content>
      <Card.Actions></Card.Actions>
    </Card>
  );
};

export default GoodItem;

const styles = StyleSheet.create({});
