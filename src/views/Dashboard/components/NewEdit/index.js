import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { sendAddRecipeRequest, sendEditRecipeRequest } from '../../../../redux/actions/changeRecipe';
import { fetchBooksList } from '../../../../redux/actions/fetchRecipes';
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
        value: 0
      },
      activeStep: ''
    };
  }

  async componentDidMount() {
    await this.props.fetchBooksList();

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
      await this.setState(prevState => ({
        steps: [...prevState.steps, prevState.activeStep],
        activeStep: ''
      }));
    } else {
      const target = event.target.value;
      const values = this.state[field].includes(target) ? this.state[field] : [...this.state[field], target];
      await this.setState({ [field]: values });
    }
  }

  async submit() {
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
      imageURL
    };

    await this.setState({ isPushed: true });

    if (+time < 0) {
      await this.setState({ time: null });
    } else {
      const isValid = Object.values(data).filter(item => Array.isArray(item) ? !item.length : !item);
      if (!isValid.length) {
        this.currentItem ? await this.props.sendEditRecipeRequest({ id: this.currentItem._id, data }) :
          await this.props.sendAddRecipeRequest({...data,
            rating: {
              count: 0,
              value: 0
            }
          });
        this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      <div className="new-recipe">
        <Container>
          <RecipeForm
            values={this.state}
            handleChangeText={this.handleChangeText.bind(this)}
            handleChangeArray={this.handleChangeArray.bind(this)}
            submit={this.submit.bind(this)}
          />
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
  fetchBooksList: PropTypes.func
};

const mapStateToProps = (state) => ({
  info: state.changeRecipeResponse.info,
  listInfo: state.recipesList.recipesList
});

export default connect(mapStateToProps, {
  sendAddRecipeRequest,
  sendEditRecipeRequest,
  fetchBooksList
})(NewRecipe);