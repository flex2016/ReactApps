import { combineReducers } from "redux";
import user from "./user_reducer";
import menuItems from "./menu_reducer";
import site from "./site_reducer";

const rootReducer = combineReducers({
  user,
  menuItems,
  site,
});

export default rootReducer;
