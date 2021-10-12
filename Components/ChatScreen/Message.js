import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment";
import ReactTooltip from "react-tooltip";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage data-tip data-for="timestampTip">
        {message.message}
      </TypeOfMessage>
      <ReactTooltip id="timestampTip" place="left" type="dark" effect="solid">
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
      </ReactTooltip>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 10px;
  border-radius: 16px;
  margin: 10px;
  min-width: 43px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #0284fe;
  color: white;
`;

const Reciever = styled(MessageElement)`
  background-color: #e4e6eb;
  text-align: left;
`;
