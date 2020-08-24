import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, KeyboardAvoidingView, Alert } from "react-native";
import { TextInput, Button, Caption } from "react-native-paper";

import Colors from "../../../constants/colors";

import * as threadActions from "../../../store/actions/thread";

const CreateCommunityThreadScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");

  const [isErrorTitle, setisErrorTitle] = useState(false);
  const [isErrorContent, setisErrorContent] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState();
  const [threadTitle, setthreadTitle] = useState("");
  const [threadContent, setthreadContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [dispatch, ErrorMsg]);

  const threadSubmitHandler = async () => {
    setisSubmiting(true);
    try {
      await dispatch(
        threadActions.postThread(communityId, threadTitle, threadContent)
      ).then(() => {
        props.navigation.goBack();
      });
    } catch (error) {
      setErrorMsg(error.message);
    }
    setisSubmiting(false);
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <View>
          <TextInput
            error={isErrorTitle}
            autoFocus={true}
            style={{ margin: 5 }}
            mode="outlined"
            label="Title"
            placeholder="Write thread title"
            value={threadTitle}
            onChangeText={(threadTitle) => setthreadTitle(threadTitle)}
            onBlur={() => {
              if (threadTitle == "") {
                setisErrorTitle(true);
              } else {
                setisErrorTitle(false);
              }
            }}
          />
          {isErrorTitle && (
            <Caption
              style={{ marginStart: 5, marginBottom: 5, color: Colors.error }}
            >
              title is required
            </Caption>
          )}
        </View>
        <View>
          <TextInput
            error={isErrorContent}
            style={{ margin: 5 }}
            placeholder="Write thread content here..."
            value={threadContent}
            onChangeText={(threadContent) => setthreadContent(threadContent)}
            multiline={true}
            numberOfLines={6}
            onBlur={() => {
              if (threadContent == "") {
                setisErrorContent(true);
              } else {
                setisErrorContent(false);
              }
            }}
          />
          {isErrorContent && (
            <Caption
              style={{ marginStart: 5, marginBottom: 5, color: Colors.error }}
            >
              thread content cannot be empty
            </Caption>
          )}
        </View>
        <Button
          loading={isSubmiting}
          disabled={isErrorTitle}
          style={{ margin: 5 }}
          color={Colors.primary}
          mode="contained"
          onPress={() => {
            if (threadContent == "") {
              setisErrorContent(true);
            } else {
              setisErrorContent(false);
              threadSubmitHandler();
            }
          }}
        >
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateCommunityThreadScreen;

CreateCommunityThreadScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Submit new Thread",
  };
};
