import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Button } from "semantic-ui-react";
import { openModal } from "../../modals/modalActions";

function SignedOutMenu() {
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Button
        onClick={() => dispatch(openModal("LoginModal"))}
        basic
        content="Login"
      />
      <Button
        onClick={() => dispatch(openModal("RegisterModal"))}
        basic
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
}

export default SignedOutMenu;
