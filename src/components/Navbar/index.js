import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Form, FormGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { AUTH_MODES, navLinks } from '../../constants';
import { loggedIn } from '../../helpers';
import { sendLoginRequest, sendLogoutRequest, sendRegisterRequest } from '../../redux/actions/authentication';
import ModalItem from '../../views/Dashboard/Show/components/ModalItem';
import AuthForm from '../AuthForm';
import './styles.scss';


class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isModal: false,
      username: '',
      password: '',
      authMode: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.changeField = this.changeField.bind(this);
  }

  async changeField(event, field) {
    await this.setState({ [field]: event.target.value });
  }

  async toggleModal(isAuth, authMode) {
    await this.sendRequest(isAuth);
    await this.setState(prevState => ({ isModal: !prevState.isModal, authMode: authMode || prevState.authMode }));
  }

  reloadPage() {
    window.location.reload();
  }

  async sendRequest(isAuth) {
    if (this.state.authMode && isAuth) {
      const { username, password } = this.state;
      const data = { username, password };

      this.state.authMode === AUTH_MODES.LOGIN ? await this.props.sendLoginRequest(data) :
        await this.props.sendRegisterRequest(data);

      if (this.props.authInfo && this.props.authInfo.token) {
        localStorage.setItem('token', this.props.authInfo.token);
        this.reloadPage();
      }
    }
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  async logout() {
    await this.props.sendLogoutRequest();
    this.reloadPage();
  }

  render() {
    console.log('this.props', this.props.userInfo);
    const { username, password } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            Your Cook Book
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!loggedIn && navLinks.isNotLoggedIn.map(title => (
                <NavItem key={title}>
                  <NavLink onClick={() => this.toggleModal(false, title)}>
                    {title}
                  </NavLink>
                </NavItem>
              ))}
              {loggedIn && navLinks.loggedIn.map((item, index) => (
                <NavItem key={item}>
                  {index === 0 ?
                    <NavLink tag={Link} to='/new'>
                      {item}
                    </NavLink> :
                    <NavLink onClick={() => this.logout()}>
                      {item}
                    </NavLink>
                  }
                </NavItem>)
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <ModalItem
          title={this.state.authMode}
          isModal={this.state.isModal}
          toggle={this.toggleModal}
        >
          <Form>
            <FormGroup>
              <AuthForm
                username={username}
                password={password}
                changeField={(value, field) => this.changeField(value, field)}
              />
            </FormGroup>
          </Form>
        </ModalItem>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.user.response,
  userInfo: state.user.userInfo
});

AppNavbar.propTypes = {
  sendLoginRequest: PropTypes.func,
  sendLogoutRequest: PropTypes.func,
  sendRegisterRequest: PropTypes.func,
  userInfo: PropTypes.object,
};

export default connect(mapStateToProps, {
  sendLoginRequest,
  sendRegisterRequest,
  sendLogoutRequest
})(AppNavbar);