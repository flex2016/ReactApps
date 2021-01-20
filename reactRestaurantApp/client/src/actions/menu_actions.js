import axios from "axios";
import {
  GET_MENU_ITEMS_BY_SELL,
  GET_MENU_ITEMS_BY_ARRIVAL,
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_MENU_ITEMS_TO_SHOP,
  ADD_MENU_ITEM,
  CLEAR_MENU_ITEM,
} from "./types";

import { MENU_SERVER } from "../components/utils/misc";

export function getMenuItemsBySell() {
  //?sortBy=sold&order=desc&limit=100
  const request = axios
    .get(`${MENU_SERVER}/items?sortBy=sold&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_MENU_ITEMS_BY_SELL,
    payload: request,
  };
}

export function getMenuItemsByArrival() {
  const request = axios
    .get(`${MENU_SERVER}/items?sortBy=createdAt&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_MENU_ITEMS_BY_ARRIVAL,
    payload: request,
  };
}

export function getMenuItemsToShop() {
  const request = axios
    .get(`${MENU_SERVER}/items?sortBy=category&order=desc&limit=200`)
    .then((response) => response.data);

  return {
    type: GET_MENU_ITEMS_TO_SHOP,
    payload: request,
  };
}

export function addMenuItem(datatoSubmit) {
  const request = axios
    .post(`${MENU_SERVER}/item`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_MENU_ITEM,
    payload: request,
  };
}

export function clearMenuItem() {
  return {
    type: CLEAR_MENU_ITEM,
    payload: "",
  };
}

////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////

export function getCategories() {
  const request = axios
    .get(`${MENU_SERVER}/categories`)
    .then((response) => response.data);

  return {
    type: GET_CATEGORIES,
    payload: request,
  };
}

export function addCategory(dataToSubmit, existingCategories) {
  const request = axios
    .post(`${MENU_SERVER}/category`, dataToSubmit)
    .then((response) => {
      let categories = [...existingCategories, response.data.category];
      return {
        success: response.data.success,
        categories,
      };
    });
  return {
    type: ADD_CATEGORY,
    payload: request,
  };
}
