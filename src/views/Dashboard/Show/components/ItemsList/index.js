import PropTypes from "prop-types";
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./styles.scss";


const ItemsList = (props) => {
  const list = (data) =>  Array.isArray(data) ?
    data.map((item, index) => (
      <ListGroupItem className={props.isStep ? 'item-step' : ''} key={`${item}${index}`}>{item}</ListGroupItem>
    ))
    :
    <ListGroupItem>{data} min</ListGroupItem>;

  return (
    <div className='items-list'>
      <h5 className='items-list__title'>{props.title}</h5>
      <ListGroup>
        {list(props.items)}
      </ListGroup>
    </div>
  );
};

ItemsList.propTypes = {
  title: PropTypes.string,
  isStep: PropTypes.bool,
  items: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
};

export default ItemsList;