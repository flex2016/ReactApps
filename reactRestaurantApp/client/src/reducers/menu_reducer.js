import {
  GET_MENU_ITEMS_BY_SELL,
  GET_MENU_ITEMS_BY_ARRIVAL,
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_MENU_ITEMS_TO_SHOP,
  ADD_MENU_ITEM,
  CLEAR_MENU_ITEM,
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_MENU_ITEMS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_MENU_ITEMS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return {
        ...state,
        addCategory: action.payload.success,
        categories: action.payload.categories,
      };
    case GET_MENU_ITEMS_TO_SHOP:
      return { ...state, toShop: action.payload };

    case ADD_MENU_ITEM:
      return { ...state, addMenuItem: action.payload };
    case CLEAR_MENU_ITEM:
      return { ...state, addMenuItem: action.payload };

    default:
      return state;
  }
}
