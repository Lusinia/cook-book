import PropTypes from 'prop-types';
import React from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';


const Banner = (props) => (
  <InputGroup>
    <h1 className='title'>{props.title}</h1>
    <InputGroupAddon addonType="prepend">
      <i className="fa fa-search" aria-hidden="true"/>
    </InputGroupAddon>
    <Input
      onChange={props.filterData}
      type="search"
      name="search"
      id="search"
    />
  </InputGroup>
);


Banner.propTypes = {
  title: PropTypes.string,
  filterData: PropTypes.func
};

export default Banner;