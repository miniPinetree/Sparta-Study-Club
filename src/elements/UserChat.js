import React from "react";
import { Grid, Text } from "./";
const UserChat = (props) => {
  const { msg, nickname, date } = props;

  let timestamp = Number(date);
  let _date = new Date(timestamp).toISOString().slice(2, 10);
  //사용자 채팅
  return (
    <Grid padding="5px 15px 0px 15px">
      <Grid is_flex>
        <Text bold color="#e3344e">
          😊{nickname}
        </Text>
        <Text size="12px" color="#434141">
          {_date}
        </Text>
      </Grid>
      <Text size="15px" color="#434141" margin="4px 0px 10px 7px">
        {msg}
      </Text>
    </Grid>
  );
};
export default UserChat;
