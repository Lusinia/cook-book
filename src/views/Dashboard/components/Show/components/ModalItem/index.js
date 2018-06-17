import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './styles.scss';


const ModalItem = (props) => {
  const toggle = (isDelete) => {
    props.toggle(isDelete);
  };

  return (
    <div className='modal-item'>
      <Modal isOpen={props.isModal} className={props.className}>
        <ModalHeader toggle={() => toggle(false)}>Are you sure?</ModalHeader>
        <ModalBody>
          After pressing the button, the recipe will be deleted.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle(true)}>Delete</Button>
          <Button color="secondary" onClick={() => toggle(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalItem.propTypes = {
  toggle: PropTypes.func,
};

export default ModalItem;