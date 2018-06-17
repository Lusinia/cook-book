import PropTypes from "prop-types";
import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import "./styles.scss";


const FakeInput = (props) => (
  <FormGroup row>
    <Col sm={2}>
      <Label>{props.title}</Label>
    </Col>
    <Col sm={6}>
      <div className="fake-input">
        {props.values.length ?
          props.values.map(item => (
            <p
              className='input-item'
              key={item}
            >{item}</p>
          ))
          :
          <p>{props.title} will be here</p>
        }
      </div>
    </Col>
    <Col sm={4}>
      <Input
        invalid={props.invalid }
        type="select"
        name="ingredient"
        onChange={item => props.handleChangeArray(item, props.title.toLowerCase())}
      >
        {props.items.map(item => {
          return <option key={item}>{item}</option>;
        })}
      </Input>
    </Col>
  </FormGroup>
);


FakeInput.propTypes = {
  handleChangeArray: PropTypes.func,
  values: PropTypes.array,
  items: PropTypes.array,
  title: PropTypes.string
};

export default FakeInput;