import React, { Component } from "react";
import { Container } from "reactstrap";
import RecipeForm from "./components/RecipeForm";
import "./styles.scss";


class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      time: null,
      description: null,
      imageURL: null,
      steps: [],
      ingredients: [],
      categories: [],
      isPushed: false
    };
  }

  handleChangeText(event, field) {
    this.setState({ [field]: event.target.value });
  }

  handleChangeArray(event, field) {
    const target = event.target.value;
    const values = this.state[field].includes(target) ? this.state[field] : [...this.state[field], target];
    this.setState({ [field]: values });
  }

  async submit() {
   await this.setState({isPushed: true});
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

export default NewRecipe;