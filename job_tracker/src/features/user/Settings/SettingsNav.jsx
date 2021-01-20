import React, { Fragment } from "react";
import { Header, Menu, Responsive } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
  return (
    <Fragment>
      <Responsive as={Menu} {...Responsive.onlyMobile}>
        <Header icon="user" attached inverted color="grey" content="Profile" />
        <Menu.Item as={NavLink} to="/settings/basic">
          Basics
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          About Me
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          My Photos
        </Menu.Item>
      </Responsive>
      <Responsive as={Menu} minWidth={768} vertical>
        <Header icon="user" attached inverted color="grey" content="Profile" />
        <Menu.Item as={NavLink} to="/settings/basic">
          Basics
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          About Me
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          My Photos
        </Menu.Item>
      </Responsive>
      <Menu vertical>
        <Header
          icon="settings"
          attached
          inverted
          color="grey"
          content="Account"
        />
        <Menu.Item as={NavLink} to="/settings/account">
          My Account
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default SettingsNav;

// import React, { Fragment } from "react";
// import { Header, Menu, Responsive, Grid } from "semantic-ui-react";
// import { NavLink } from "react-router-dom";

// const NavBarDesktop = () => (
//   <Fragment>
//     <Menu vertical>
//       <Header icon="user" attached inverted color="grey" content="Profile" />
//       <Menu.Item as={NavLink} to="/settings/basic">
//         Basics
//       </Menu.Item>
//       <Menu.Item as={NavLink} to="/settings/about">
//         About Me
//       </Menu.Item>
//       <Menu.Item as={NavLink} to="/settings/photos">
//         My Photos
//       </Menu.Item>
//     </Menu>
//     <Menu vertical>
//       <Header
//         icon="settings"
//         attached
//         inverted
//         color="grey"
//         content="Account"
//       />
//       <Menu.Item as={NavLink} to="/settings/account">
//         My Account
//       </Menu.Item>
//     </Menu>
//   </Fragment>
// );
// const NavBarMobile = () => (
//   <Fragment>
//     <Menu>
//       <Header icon="user" attached inverted color="grey" content="Profile" />
//       <Menu.Item as={NavLink} to="/settings/basic">
//         Basics
//       </Menu.Item>
//       <Menu.Item as={NavLink} to="/settings/about">
//         About Me
//       </Menu.Item>
//       <Menu.Item as={NavLink} to="/settings/photos">
//         My Photos
//       </Menu.Item>
//     </Menu>
//     <Menu vertical>
//       <Header
//         icon="settings"
//         attached
//         inverted
//         color="grey"
//         content="Account"
//       />
//       <Menu.Item as={NavLink} to="/settings/account">
//         My Account
//       </Menu.Item>
//     </Menu>
//   </Fragment>
// );

// const SettingsNav = () => {
//   return (
//     <Fragment>
//       <Responsive {...Responsive.onlyMobile}>
//         <NavBarMobile />
//       </Responsive>
//       <Responsive minWidth={768}>
//         <NavBarDesktop />
//       </Responsive>
//     </Fragment>
//   );
// };

// export default SettingsNav;
