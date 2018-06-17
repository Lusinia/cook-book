import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { INPUT } from "../../../../../../constants";
import FakeInput from "../FakeInput";
import "./styles.scss";


const RecipeForm = (props) => {
  return (
    <div className='new-recipe-form'>
      <Form>
        <FormGroup row>
          <Col sm={2}>
            <Label for="name">Recipe name</Label>
          </Col>
          <Col sm={5}>
            <Input
              invalid={props.values.isPushed && !props.values.name }
              type="text"
              name="name"
              id="name"
              placeholder="Name of your recipe"
              onChange={item => props.handleChangeText(item, 'name')}
            />
          </Col>
          <Col sm={{ size: 2, offset: 1 }}>
            <Label for="name">Total time</Label>
          </Col>
          <Col sm={2}>
            <Input
              invalid={props.values.isPushed && !props.values.time }
              type="number"
              name="time"
              id="time"
              placeholder="Time"
              onChange={item => props.handleChangeText(item, 'time')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label for="imageURL">Image URL</Label>
          </Col>
          <Col sm={10}>
            <Input
              invalid={props.values.isPushed && !props.values.url }
              type="url"
              name="imageURL"
              id="imageURL"
              placeholder="Enter url for your recipe"
              onChange={item => props.handleChangeText(item, 'imageURL')}
            />
          </Col>
        </FormGroup>
        <div>
          <FakeInput
            invalid={props.values.isPushed && !props.values.ingredients.length }
            title='Ingredients'
            values={props.values.ingredients}
            items={INPUT.INGREDIENTS}
            handleChangeArray={props.handleChangeArray}
          />
        </div>
        <div>
          <FakeInput
            invalid={props.values.isPushed && !props.values.categories.length }
            title='Categories'
            values={props.values.categories}
            items={INPUT.CATEGORIES}
            handleChangeArray={props.handleChangeArray}
          />
        </div>
        <FormGroup row>
          <Col sm={2}>
            <Label for="description">Description</Label>
          </Col>
          <Col sm={10}>
            <Input
              type="textarea"
              name="description"
              id="description"
              onChange={item => props.handleChangeText(item, 'description')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label for="steps">Steps</Label>
          </Col>
          <Col sm={8}>
            <Input
              invalid={props.values.isPushed && !props.values.steps.length }
              type="text"
              name="steps"
              id="steps"
              onChange={item => props.handleChangeArray(item, 'steps')}
            />
          </Col>
          <Col sm={1}>
            <Button type="button" color="info">Add step</Button>
          </Col>
        </FormGroup>

        <Button onClick={props.submit}>Submit</Button>
      </Form>
    </div>
  );
};

RecipeForm.propTypes = {
  submit: PropTypes.func,
  handleChangeText: PropTypes.func,
  handleChangeArray: PropTypes.func,
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    time: PropTypes.string,
    ingredients: PropTypes.array,
    categories: PropTypes.array,
    isPushed: PropTypes.bool
  })
};

export default RecipeForm;