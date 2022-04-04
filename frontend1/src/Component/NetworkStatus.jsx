import Spinner from "react-svg-spinner";
import { connect } from "react-redux";
import styled from "styled-components";
import toggleNetworkStatus from "../util/toggleNetworkStatus";

const Box = styled.div({
  border: "1px solid #000",
  padding: 10,
  margin: 10,
});

const PendingActions = connect((state) => ({
  children: `${state.offline.outbox.length} pending ${
    state.offline.outbox.length === 0 || state.offline.outbox.length > 1
      ? "actions"
      : "action"
  }`,
}))(
  styled.div({
    margin: 5,
  })
);

export const NetworkStatus = connect((state) => ({
  isOnline: state.offline.online,
  isBusy: state.offline.busy,
}))(({ isOnline, isBusy }) => (
  <Box>
    <div>NetworkStatus</div>
    <button
      onClick={() => toggleNetworkStatus.toggleNetworkStatus(!isOnline)}
      style={{
        height: 30,
        borderRadius: 30,
        border: "none",
        padding: "3px 10px",
        color: "#fff",
        backgroundColor: isOnline ? "green" : "red",
      }}
    >
      {isOnline ? "online" : "offline"}{" "}
      {isBusy && <Spinner color="white" thickness={5} />}
    </button>

    <PendingActions />
  </Box>
));
