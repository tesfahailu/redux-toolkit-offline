import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { increaseAmount, addItem } from "../redux/increaseAmount.slice";

const Box = styled.div({
  border: "1px solid #000",
  padding: 10,
  margin: 10,
});

export const Items = () => {
  const { items } = useSelector((state) => state.amount);
  const cleanedItems = items ? Object.entries(items) : [];
  const dispatch = useDispatch();

  return (
    <Box>
      <div>Items</div>
      <ul>
        {cleanedItems.map(([itemId, { amount, pending, error }]) => (
          <li key={itemId} style={{ color: error && "red" }}>
            {amount}{" "}
            {error && (
              <button onClick={() => dispatch(addItem({ itemId }))}>
                retry
              </button>
            )}
            {!pending && (
              <button onClick={() => dispatch(increaseAmount({ itemId }))}>
                +
              </button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(addItem())}>addItem</button>
    </Box>
  );
};
