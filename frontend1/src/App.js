import "modern-normalize";
import React from "react";
import "regenerator-runtime";
import styled from "styled-components";
import { NetworkStatus } from "./Component/NetworkStatus";
import { Items } from "./Component/Items";
import { StoreState } from "./Component/StoreState";

const Flex = styled.div({
  display: "flex",
  flexDirection: "column",
});

const FlexItem = styled.div({
  flexGrow: 1,
});

const App = () => (
  <Flex style={{ width: "100vw" }}>
    <FlexItem grow={1} style={{ padding: 10 }}>
      <NetworkStatus />
      <Items />
    </FlexItem>
    <FlexItem noShrink style={{ padding: 10 }}>
      <StoreState />
    </FlexItem>
  </Flex>
);

export default App;
