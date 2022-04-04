import { createSlice } from "@reduxjs/toolkit";
import { makeId } from "./../util/makeId";

const initialState = {
  items: {
    [makeId()]: { amount: 10 },
    [makeId()]: { amount: 20 },
  },
};

export const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    increaseAmount: {
      reducer: (draft, action) => {
        draft.items[action.payload.itemId].amount += 10;
      },
      prepare: ({ itemId }) => {
        return {
          payload: { itemId },
          meta: {
            offline: {
              // the network action to execute:
              effect: {
                url: "https://www.localhost/api/increase-amount",
                method: "POST",
                json: { itemId },
              },
              // action to dispatch if network action fails permanently:
              rollback: {
                type: "amount/increaseAmountRollback",
                meta: { itemId },
              },
            },
          },
        };
      },
    },
    increaseAmountRollback: (draft, action) => {
      draft.items[action.meta.itemId].amount -= 10;
    },
    addItem: {
      reducer: (draft, action) => {
        draft.items[action.payload.itemId] = {
          pending: true,
          amount: action.payload.amount,
        };
      },
      prepare: ({ itemId = makeId(), amount = 1 } = {}) => {
        console.log({ itemId }, { amount });
        return {
          payload: { itemId, amount },
          meta: {
            offline: {
              // the network action to execute:
              effect: {
                url: "/api/add-item",
                method: "POST",
                json: { itemId, amount },
              },
              // action to dispatch when effect succeeds:
              commit: { type: "amount/addItemCommit", meta: { itemId } },
              // action to dispatch if network action fails permanently:
              rollback: { type: "amount/addItemRollback", meta: { itemId } },
            },
          },
        };
      },
    },
    addItemCommit: (draft, action) => {
      delete draft.items[action.meta.itemId].pending;
      delete draft.items[action.meta.itemId].error;
    },
    addItemRollback: (draft, action) => {
      draft.items[action.meta.itemId].error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increaseAmount,
  incrementByAmount,
  addItem,
  addItemCommit,
  addItemRollback,
} = amountSlice.actions;

export default amountSlice.reducer;
