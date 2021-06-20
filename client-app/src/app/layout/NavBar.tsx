import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          {" "}
          <img src="/assets/logo.png" style={{ marginRight: "10px" }} />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/errors" name="Errors" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default NavBar;
