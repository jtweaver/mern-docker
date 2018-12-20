import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  state = { modal: false, name: '' };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;
    this.props.addItem({ name });

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input type="text" name="name" id="item" placeholder="Add Shopping Item" onChange={this.onChange} />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps, {
  addItem
})(ItemModal);
