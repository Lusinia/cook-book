import PropTypes from "prop-types";
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./styles.scss";


const ItemsList = (props) => {
  const list = (data) => {
  return  typeof data === 'number' ?
     (<ListGroupItem>{data} min</ListGroupItem>)
    :
    data.map(item => (
      <ListGroupItem className={props.isStep ? 'item-step' : ''} key={item}>{item}</ListGroupItem>
    ))
  };

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
};

export default ItemsList;