import React from "react";
import { View, Text } from "react-native";
import { Card, Button, Paragraph, Avatar } from "react-native-paper";

import Colors from "../../constants/colors";

const asAdminGroupMemberItem = (props) => {
  return (
    <View>
      <Card>
        <Card.Title title={props.userName} subtitle={props.joinTime} />
        <Card.Content>
          {/* <Paragraph>Card content</Paragraph> */}
          <Avatar.Icon size={24} icon="star" color={Colors.warning} />
        </Card.Content>
        <Card.Actions>
          {props.active ? (
            <Button
              style={{ marginEnd: 10 }}
              mode="contained"
              color={Colors.error}
              onPress={props.onRemove}
            >
              Remove
            </Button>
          ) : (
            <View></View>
          )}

          {!props.admin ? (
            <Button
              mode="contained"
              color={Colors.primary}
              onPress={props.onRemove}
            >
              set Admin
            </Button>
          ) : (
            <View></View>
          )}
        </Card.Actions>
        {/* <Text>{JSON.stringify(props)}</Text> */}
      </Card>
    </View>
  );
};

export default asAdminGroupMemberItem;
