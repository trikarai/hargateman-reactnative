import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button, Card, Title, Paragraph, Chip } from "react-native-paper";
import Colors from "../../constants/colors";

const asAdminGroupApplicantItem = (props) => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.userName}</Title>
        {/* <Paragraph>{JSON.stringify(props)}</Paragraph> */}
      </Card.Content>
      {!props.concluded ? (
        <Card.Actions>
          <Button
            style={{ marginEnd: 10 }}
            color={Colors.primary}
            mode="contained"
            onPress={props.onAccept}
          >
            Accept
          </Button>
          <Button
            style={{ marginEnd: 10 }}
            color={Colors.error}
            mode="contained"
            onPress={props.onReject}
          >
            Reject
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions>
          <View>
            <Chip>{props.notes} </Chip>
          </View>
        </Card.Actions>
      )}
    </Card>
  );
};

export default asAdminGroupApplicantItem;
