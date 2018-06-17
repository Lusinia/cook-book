import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import ItemsList from '../../../../components/Show/components/ItemsList';
import { INPUT } from '../../../../../../constants';
import FakeInput from '../FakeInput';
import './styles.scss';


const fakeInputs = ['ingredients', 'categories'];

const RecipeForm = (props) => (
  <div className='new-recipe-form'>
    <Form>
      <FormGroup row>
        <Col sm={2}>
          <Label for="name">Recipe name</Label>
        </Col>
        <Col sm={5}>
          <Input
            invalid={props.values.isPushed && !props.values.name}
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
            invalid={props.values.isPushed && (!props.values.time || +props.values.time < 0)}
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
            invalid={props.values.isPushed && !props.values.imageURL}
            type="url"
            name="imageURL"
            id="imageURL"
            placeholder="Enter url for your recipe"
            onChange={item => props.handleChangeText(item, 'imageURL')}
          />
        </Col>
      </FormGroup>
      {fakeInputs.map(item => (
        <div key={item}>
          <FakeInput
            invalid={props.values.isPushed && !props.values[item].length}
            title={item.charAt(0).toUpperCase() + item.slice(1)}
            values={props.values[item]}
            items={INPUT[item.toUpperCase()]}
            handleChangeArray={props.handleChangeArray}
          />
        </div>
      ))}
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
            invalid={props.values.isPushed && !props.values.steps.length}
            type="text"
            name="steps"
            id="steps"
            value={props.values.activeStep}
            onChange={item => props.handleChangeText(item, 'activeStep')}
          />
        </Col>
        <Col sm={1}>
          <Button
            type="button"
            color="info"
            onClick={() => {
              if (props.values.activeStep) {
                props.handleChangeArray(null, 'steps');
              }
            }}
          >Add step</Button>
        </Col>
      </FormGroup>
      <Row>
        <Col sm={{ size: 10, offset: 2 }}>
          <ItemsList
            title=''
            items={props.values.steps}
            isStep={true}
          />
        </Col>
      </Row>
      <Button color='success' onClick={props.submit}>Submit</Button>
    </Form>
  </div>
);

RecipeForm.propTypes = {
  submit: PropTypes.func,
  handleChangeText: PropTypes.func,
  handleChangeArray: PropTypes.func,
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    activeStep: PropTypes.string,
    time: PropTypes.string,
    ingredients: PropTypes.array,
    categories: PropTypes.array,
    isPushed: PropTypes.bool
  })
};

export default RecipeForm;