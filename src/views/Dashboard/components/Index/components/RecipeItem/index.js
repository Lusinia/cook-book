import PropTypes from 'prop-types';
import React from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { sendEditRecipeRequest } from '../../../../../../redux/actions/changeRecipe';
import './styles.scss';


const RecipeItem = (props) => {
  const onChange = async (data) => {
    // const count = props.data.rating.count + 1;
    // const value = (props.data.rating.value + data) / count;
    //
    // await props.sendEditRecipeRequest({
    //   id: props.data._id,
    //   data: {
    //     ...props.data,
    //     rating: {
    //       count,
    //       value
    //     }
    //   }
    // });
  };

  return (
    <div className={props.isHorizontal ? 'show-recipe horizontal' :
      props.isBigCard ? 'show-recipe big-card' : 'show-recipe'}>
      <Card>
        <CardImg
          top
          width="100%"
          src={props.data.imageURL}
          alt="Recipe image"
          onClick={() => {
            props.changeRoute(`/${props.data._id}`);
          }}
        />
        <CardBody>
          <div
            className="show-recipe__top"
            onClick={() => {
              props.changeRoute(`/${props.data._id}`);
            }}
          >
            <CardTitle>{props.data.name}</CardTitle>
            <CardText>{props.data.description.substr(0, 30)}...</CardText>
          </div>
          <div className="show-recipe__bottom">
           <div>
             <Rating
               start = {0}
               stop = {5}
               emptySymbol="fa fa-star-o"
               fullSymbol="fa fa-star"
               initialRating={props.data.rating.value}
               onChange={(data) => onChange(data)}
             />
             <span className="date-info">({props.data.rating.count})</span>
           </div>
            <p className="date-info">{new Date(props.data.date).toDateString()}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
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
  sendEditRecipeRequest: PropTypes.func
};

export default connect(null, { sendEditRecipeRequest })(RecipeItem);