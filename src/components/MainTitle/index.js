import PropTypes from 'prop-types';
import React from 'react';


const Avatar = (props) => (
  <div className="avatar">
    <span className='user-name'>{props.name},</span>
    <span>Cook With Us</span>
  </div>
);

Avatar.propTypes = {
  name: PropTypes.string
};

export default Avatar;