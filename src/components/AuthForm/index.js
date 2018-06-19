import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { loginFields } from '../../constants';


const AuthForm = (props) => (
  <div>
    {loginFields(props).map(item => (
      <FormGroup  key={item.name}>
        <Label for="steps">{item.title}</Label>
        <Input
          invalid={false}
          type={item.type}
          name={item.name}
          id={item.name}
          value={props[item.name]}
          onChange={value => props.changeField(value, item.name)}
        />
      </FormGroup>
    ))}
  </div>
);

AuthForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  changeField: PropTypes.func,
};


export default AuthForm;