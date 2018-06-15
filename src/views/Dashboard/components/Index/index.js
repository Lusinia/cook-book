import React, { Component } from 'react';
import './styles.scss';
import { fetchBooksList } from '../../../../redux/actions/fetchRecipes';
import { connect } from 'react-redux';


class ShowRecipes extends Component {

  async componentDidMount() {
    console.log('HEREEEE');
    this.props.fetchBooksList();
  }


  render() {
    console.log('listInfo', this.props.listInfo);

    return (
      <div className="EditRecipe">
        <p className="container">
          ShowRecipes
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});
export default connect(mapStateToProps, { fetchBooksList })(ShowRecipes);