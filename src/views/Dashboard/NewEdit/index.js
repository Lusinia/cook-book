import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getUserInfo } from '../../../redux/actions/authentication';
import { sendAddRecipeRequest, sendEditRecipeRequest } from '../../../redux/actions/changeRecipe';
import { fetchBooksList } from '../../../redux/actions/fetchRecipes';
import ModalItem from '../Show/components/ModalItem';
import RecipeForm from './components/RecipeForm';
import './styles.scss';


class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      time: '',
      description: '',
      imageURL: '',
      steps: [],
      ingredients: [],
      categories: [],
      isPushed: false,
      rating: {
        count: 0,
        value: 0,
        usersId: []
      },
      activeStep: '',
      isModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchBooksList();
    await this.props.getUserInfo();
    const path = this.props.location.pathname.split('/');
    this.currentItem = path.includes('edit') ? this.props.listInfo.find(item => item._id === path[1]) : null;
    if (this.currentItem) {
      const { name, time, description, imageURL, steps, ingredients, categories, rating } = this.currentItem;
      await this.setState({
        name,
        time,
        description,
        imageURL,
        steps: steps || [],
        ingredients: ingredients || [],
        categories: categories || [],
        rating
      });
    }
  }

  handleChangeText(event, field) {
    this.setState({ [field]: event.target.value });
  }

  async handleChangeArray(event, field) {
    if (field === 'steps') {
      await this.clearStepsField();
    } else {
      const target = event.target.value;
      const values = this.state[field].includes(target) ? this.state[field] : [...this.state[field], target];
      await this.setState({ [field]: values });
    }
  }

  async toggleModal(isOk) {
    if (isOk) {
      await this.clearStepsField();
    }
    await this.setState(prevState => ({ isModal: !prevState.isModal }));
  }

  async submit() {
    if (this.state.activeStep.length) {
      this.toggleModal();
    } else {
      const { username, _id } = this.props.userInfo.user;
      const {
        name,
        time,
        description,
        imageURL,
        steps,
        ingredients,
        categories
      } = this.state;
      const data = {
        name,
        ingredients,
        categories,
        description,
        steps,
        time: +time,
        imageURL,
        author: {
          username,
          id: _id
        }
      };

      await this.setState({ isPushed: true });

      if (+time < 0) {
        await this.setState({ time: null });
      } else {
        const isValid = Object.values(data).filter(item => Array.isArray(item) ? !item.length : !item);
        if (!isValid.length) {
          this.currentItem ? await this.props.sendEditRecipeRequest({ id: this.currentItem._id, data }) :
            await this.props.sendAddRecipeRequest({
              ...data,
              rating: {
                count: 0,
                value: 0,
                usersId: []
              }
            });
          this.props.history.push('/');
        }
      }
    }
  }

  async removeItem(item, field) {
    await this.setState(prevState => {
      const newArray = [...prevState[field]];
      return {
        [field]: newArray.filter(i => i !== item)
      };
    });
  }

  async clearStepsField() {
    await this.setState(prevState => ({
      steps: [prevState.activeStep, ...prevState.steps],
      activeStep: ''
    }));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.activeStep.length) {
      this.clearStepsField();
    }
  }

  render() {
    return (
      <div className="new-recipe">
        <Container>
          <RecipeForm
            handleKeyPress={this.handleKeyPress}
            values={this.state}
            handleChangeText={this.handleChangeText.bind(this)}
            handleChangeArray={this.handleChangeArray.bind(this)}
            submit={this.submit.bind(this)}
            removeItem={this.removeItem.bind(this)}
          />
          <ModalItem isModal={this.state.isModal} toggle={this.toggleModal}>
            <div>
              <p>You have to add last step to list.</p>
              <p>Please click 'Ok' and submit one more time.</p>
            </div>
          </ModalItem>
        </Container>
      </div>
    );
  }
}

NewRecipe.propTypes = {
  info: PropTypes.string,
  listInfo: PropTypes.array,
  sendAddRecipeRequest: PropTypes.func,
  sendEditRecipeRequest: PropTypes.func,
  getUserInfo: PropTypes.func,
  fetchBooksList: PropTypes.func
};

const mapStateToProps = (state) => ({
  info: state.changeRecipeResponse.info,
  listInfo: state.recipesList.recipesList,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, {
  sendAddRecipeRequest,
  sendEditRecipeRequest,
  fetchBooksList,
  getUserInfo
})(NewRecipe);