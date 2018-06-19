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
      activeClickID: null,
      isUserChangedRating: props.data.rating.usersId.includes(props.userInfo._id)
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const isUser = nextProps.userInfo.user && nextProps.userInfo.user._id;
    return {
      isUserChangedRating: isUser ? nextProps.data.rating.usersId.includes(nextProps.userInfo.user._id) : false,
      info: nextState.activeClickID ? nextProps.info : null
    };
  }

  onChange = async (data) => {
    if (!this.props.data.rating.usersId.includes(this.props.userInfo.user._id) && !this.state.activeClickID) {
      const requestData = {
        id: this.props.data._id,
        data: {
          value: data,
          usersId: this.props.userInfo.user._id
        }
      };
      await this.setState({ activeClickID: this.props.data._id });
      await this.props.editRecipeRating(requestData);
    }
  };

  getReadonly() {
    const isUser = this.props.userInfo.user && this.props.userInfo.user.username && this.props.userInfo.user.username;
    if (isUser) {
      const userLoggedIn = !!(this.state.activeClickID || this.state.isUserChangedRating) &&
        !!this.props.userInfo.user.username;
      const userNotLoggedIn = !this.props.userInfo.user.username;
      return userLoggedIn || userNotLoggedIn;
    } else {
      return true;
    }
  }

  render() {
    const { data } = this.state;
    let shownRating = null;
    if (this.state.info) {
      shownRating = this.state.info.find(item => item.id === this.state.activeClickID);
    }

    return (
      <div className={this.props.isHorizontal ? 'show-recipe horizontal' :
        this.props.isBigCard ? 'show-recipe big-card' : 'show-recipe'}>
        {this.state.data &&
        <Card>
          <CardImg top width="100%" src={this.state.data.imageURL} alt="Recipe image" onClick={() => {
              this.props.changeRoute(`/${data._id}`);
            }}
          />
          {data &&
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
                  readonly={this.getReadonly()}
                  initialRating={shownRating ? shownRating.data.value : data.rating.value}
                  onChange={(data) => this.onChange(data)}
                />
                <span
                  className="date-info">{shownRating ? `(${shownRating.data.count })` : `(${data.rating.count})`}</span>
              </div>
              <p className="date-info">{new Date(data.date).toDateString()}</p>
            </div>
          </CardBody>
          }
        </Card>
        }
      </div>
    );
  }
}

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
    author: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.string
    }),
    isHorizontal: PropTypes.bool,
    isBigCard: PropTypes.bool,
    changeRoute: PropTypes.func
  }),
  info: PropTypes.array,
  user: PropTypes.object,
  sendEditRecipeRequest: PropTypes.func
};

const mapStateToprops = (state) => ({
  info: state.changeRecipeResponse.ratings,
  userInfo: state.user.userInfo
});

export default connect(mapStateToprops, { sendEditRecipeRequest, editRecipeRating, fetchBooksList })(RecipeItem);