import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { editRecipeRating, sendEditRecipeRequest } from '../../../../../redux/actions/changeRecipe';
import './styles.scss';
import { fetchBooksList } from '../../../../../redux/actions/fetchRecipes';


class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      info: null,
      activeID: null
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      info: nextState.activeID ? nextProps.info : null
    };
  }

  onChange = async (data) => {
    const requestData = {
      id: this.props.data._id,
      data: {
        value: data,
        usersId: `${Math.random()}`
      }
    };
    await this.setState({ activeID: this.props.data._id });
    await this.props.editRecipeRating(requestData);
  };

  render() {
    const { data } = this.state;
    let shownRating = null;
    if (this.state.info) {
       shownRating = this.state.info.find(item => item.id === this.state.activeID);
    }

    return (
      <div className={this.props.isHorizontal ? 'show-recipe horizontal' :
        this.props.isBigCard ? 'show-recipe big-card' : 'show-recipe'}>
        {this.state.data &&
        <Card>
          <CardImg
            top
            width="100%"
            src={this.state.data.imageURL}
            alt="Recipe image"
            onClick={() => {
              this.props.changeRoute(`/${data._id}`);
            }}
          />
          <CardBody>
            <div
              className="show-recipe__top"
              onClick={() => {
                this.props.changeRoute(`/${data._id}`);
              }}
            >
              <CardTitle>{data.name}</CardTitle>
              <CardText>{data.description.substr(0, 30)}...</CardText>
            </div>
            <div className="show-recipe__bottom">
              <div>
                <Rating
                  start={0}
                  stop={5}
                  emptySymbol="fa fa-star-o"
                  fullSymbol="fa fa-star"
                  initialRating={shownRating ? shownRating.data.value || data.rating.value : 0 }
                  onChange={(data) => this.onChange(data)}
                />
                <span className="date-info">{shownRating ? `(${shownRating.data.count })` : `(${data.rating.count})`}</span>
              </div>
              <p className="date-info">{new Date(data.date).toDateString()}</p>
            </div>
          </CardBody>
        </Card>
        }
      </div>
    );
  }

};

RecipeItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    rating: PropTypes.shape({
      count: PropTypes.number,
      value: PropTypes.number
    }),
    isHorizontal: PropTypes.bool,
    isBigCard: PropTypes.bool,
    changeRoute: PropTypes.func
  }),
  info: PropTypes.array,
  sendEditRecipeRequest: PropTypes.func
};

const mapStateToprops = (state) => ({
  info: state.changeRecipeResponse.ratings
});

export default connect(mapStateToprops, { sendEditRecipeRequest, editRecipeRating, fetchBooksList })(RecipeItem);