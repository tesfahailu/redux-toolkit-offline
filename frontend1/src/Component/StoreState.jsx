import { connect } from "react-redux";
import { ObjectInspector } from "react-inspector";

export const StoreState = connect((state) => ({
  name: "store",
  data: state,
  expandLevel: 4,
}))(ObjectInspector);
