import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Col, Container, Row, Button } from 'reactstrap';
import { loggedIn } from '../../../helpers';
import { getUserInfo } from '../../../redux/actions/authentication';
import { sendRemoveRecipeRequest } from '../../../redux/actions/changeRecipe';
import ModalItem from './components/ModalItem';
import { fetchBooksList } from '../../../redux/actions/fetchRecipes';
import ItemsList from './components/ItemsList';
import './styles.scss';


class ShowRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentItem: null,
      isModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchBooksList();
    await this.props.getUserInfo();

    const path = this.props.location.pathname;
    const id = path.substring(1, path.length);
    await this.setState({
      currentItem: this.props.listInfo.find(i => i._id === id)
    });
  }

  redirectPage(edit) {
    this.props.history.push(edit ? `/${this.state.currentItem._id}/edit` : '/');
  }

  async toggleModal(isDelete) {
    this.setState(prevState => ({ isModal: !prevState.isModal }));

    if (isDelete) {
      await this.props.sendRemoveRecipeRequest(this.state.currentItem._id);
      this.redirectPage();
    }
  }

  isRecipeBelongsToUser() {
    if (this.state.currentItem && loggedIn) {
      return this.props.userInfo.user._id === this.state.currentItem.author.id;
    }
  }

  render() {
    return (
      <div className="show-recipe">
        <Container>
          {this.state.currentItem &&
          <div>
            <Row>
              <Col>
                <div className="image-wrapper__blur">
                  <img
                    src={this.state.currentItem.imageURL}
                    alt='bg outer'
                    className='big-image'
                  />
                  <div className="image-wrapper">
                    <img src={this.state.currentItem.imageURL} alt='bg inner'/>
                    <div className="crop-image"/>
                    <div className="image-title">
                      <h1 className="image-title__text">
                        {this.state.currentItem.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              < Col sm={{ size: 12, order: 2 }} md={{ size: 8, order: 1 }}>
                <p className="item-description">
                  {this.state.currentItem.description}
                </p>
                <ItemsList
                  title='Steps to reproduce'
                  items={this.state.currentItem.steps}
                  isStep={true}
                />

              </Col>
              <Col sm={{ size: 12, order: 1 }} md={{ size: 4, order: 2 }}>
                {this.isRecipeBelongsToUser() &&
                <div className="buttons-wrapper">
                  <Row>
                    <Col sm='6' md='12'>
                      <Button
                        outline
                        color="danger"
                        onClick={() => this.toggleModal()}
                      >
                        <i className="fa fa-trash"/>
                        Delete recipe
                      </Button>
                    </Col>
                    <Col sm='6' md='12'>
                      <Button
                        outline
                        color="warning"
                        onClick={() => this.redirectPage(true)}
                      >
                        <i className="fa fa-pencil"/>
                        Edit recipe
                      </Button>
                    </Col>
                  </Row>
                </div>
                }
                <ItemsList
                  title='Ingredients'
                  items={this.state.currentItem.ingredients}
                />
                <ItemsList
                  title='Categories'
                  items={this.state.currentItem.categories}
                />
                <ItemsList
                  title='Total time'
                  items={this.state.currentItem.time}
                />
              </Col>
            </Row>
          </div>
          }
          <ModalItem isModal={this.state.isModal} toggle={this.toggleModal.bind(this)}>
            <p> After pressing the button, the recipe will be deleted.</p>
          </ModalItem>
        </Container>
      </div>
    );
  }
}


ShowRecipe.propTypes = {
  listInfo: PropTypes.array,
  location: PropTypes.object,
  userInfo: PropTypes.object,
  fetchBooksList: PropTypes.func,
  getUserInfo: PropTypes.func,
  sendRemoveRecipeRequest: PropTypes.func
};

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, {
  fetchBooksList,
  sendRemoveRecipeRequest,
  getUserInfo
})(ShowRecipe);