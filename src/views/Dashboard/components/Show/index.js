import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { fetchBooksList } from '../../../../redux/actions/fetchRecipes';


class ShowRecipe extends Component {


  render() {
    return (
      <div className="EditRecipe">
        <p className="container">
          ShowRecipe
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});

export default connect(mapStateToProps, { fetchBooksList })(ShowRecipe);