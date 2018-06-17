import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { sendAddRecipeRequest } from '../../../../redux/actions/changeRecipe';
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
      activeStep: ''
    };
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
      category: categories,
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
        await this.props.sendAddRecipeRequest(data);
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
  info: PropTypes.any,
  sendAddRecipeRequest: PropTypes.func
};

const mapStateToProps = (state) => ({
  info: state.addRecipeResponse.info
});

export default connect(mapStateToProps, { sendAddRecipeRequest })(NewRecipe);