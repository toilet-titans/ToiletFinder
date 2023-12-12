import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, PersonCircle } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Image roundedCircle src="/images/toileticon3.jpeg" width="50px" />
        <Navbar.Brand as={NavLink} to="/">
          <h2>Toilet Finder and Rater</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              // <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add to List</Nav.Link>,
              <Nav.Link id="directory-nav" as={NavLink} to="/directory" key="directory">Directory</Nav.Link>,
              <Nav.Link id="bathrooms-nav" as={NavLink} to="/bathrooms" key="bathrooms">Bathrooms</Nav.Link>,
              <Nav.Link id="about-us-nav" as={NavLink} to="/aboutus" key="aboutus">About Us</Nav.Link>,
              // <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="bathroom-admin-nav" as={NavLink} to="/admin" key="admin">Bathroom Admin</Nav.Link>,
                <Nav.Link id="add-bathroom-nav" as={NavLink} to="/add-bathroom" key="admin">Add Bathroom</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                  <PersonCircle />
                  {' '}
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
