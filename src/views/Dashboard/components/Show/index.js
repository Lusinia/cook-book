import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooksList } from '../../../../redux/actions/fetchRecipes';
import './styles.scss';


class ShowRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentItem: null
    };
  }

  async componentDidMount() {
    await this.props.fetchBooksList();

    const path = this.props.location.pathname;
    const id = path.substring(1, path.length);
    this.setState({
      currentItem: this.props.listInfo.find(i => i._id === id)
    });
  }

  render() {
    console.log('ShowRecipe', this.state);
    return (
      <div className="EditRecipe">
        <div className="container">
          {this.state.currentItem &&
            <div className="image-wrapper">
              <img src={this.state.currentItem.imageURL} alt="recipe image"/>
              <div className="crop-image"></div>
            </div>
          }
        </div>
      </div>
    );
  }
}


ShowRecipe.propTypes = {
  listInfo: PropTypes.array,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});

export default connect(mapStateToProps, { fetchBooksList })(ShowRecipe);