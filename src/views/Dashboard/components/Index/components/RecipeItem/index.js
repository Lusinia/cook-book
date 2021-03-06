import PropTypes from 'prop-types';
import React from 'react';
import Rating from 'react-rating';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import './styles.scss';


const RecipeItem = (props) => {
  const onChange = (data) => {
    console.log('fsys', data);
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
            <Rating
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              fractions={1}
              onChange={(data) => onChange(data)}
            />
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
    isHorizontal: PropTypes.bool,
    isBigCard: PropTypes.bool,
    changeRoute: PropTypes.func,
  })
};

export default RecipeItem;