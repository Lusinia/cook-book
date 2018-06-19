import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import "./styles.scss";


const ModalItem = (props) => {
  const toggle = (isExecute) => {
    props.toggle(isExecute);
  };

  return (
    <div className='modal-item'>
      <Modal isOpen={props.isModal} className={props.className}>
        {props.title && <ModalHeader>{props.title}</ModalHeader>}
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            color="primary"
            onClick={() => toggle(true)}
          >Ok</Button>
          <Button
            outline
            color="secondary"
            onClick={() => toggle(false)}
          >Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalItem.propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
};

export default ModalItem;