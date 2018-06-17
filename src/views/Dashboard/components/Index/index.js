import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import {  SM_WIDTH } from '../../../../constants';
import { fetchBooksList } from '../../../../redux/actions/fetchRecipes';
import RecipeItem from './components/RecipeItem';
import './styles.scss';
import Immutable from 'seamless-immutable';


class ShowRecipes extends Component {

  async componentDidMount() {
    console.log('componentDidMount');
   await this.props.fetchBooksList();
  }

  sortData(data) {
    return Immutable.asMutable(data).sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
    })
  }

  render() {
    return (
      <div className="show-recipes">
        <div className="banner-wrapper">
          <InputGroup>
            <h1 className='title'>Find a Recipe</h1>
            <InputGroupAddon addonType="prepend">
              <i className="fa fa-search" aria-hidden="true"></i>
            </InputGroupAddon>
            <Input type="search" name="search" id="search"/>
          </InputGroup>
        </div>
        <Container>
          <Row>
            {this.sortData(this.props.listInfo)
              .map((item, index) => {
              switch (index) {
                case 0:
                case 1:
                case 2:
                  return (
                    <Col key={item.name} sm="12" md="4">
                      <RecipeItem
                        data={item}
                        changeRoute={this.props.history.push}
                      />
                    </Col>
                  );
                case 3:
                  return (
                    <Col key={item.name} md="12">
                      <RecipeItem
                        data={item}
                        isHorizontal={window.innerWidth >= SM_WIDTH}
                        changeRoute={this.props.history.push}
                      />
                    </Col>
                  );
                default:
                  return (
                    <Col key={item.name} md="6">
                      <RecipeItem
                        data={item}
                        isBigCard={window.innerWidth >= SM_WIDTH}
                        changeRoute={this.props.history.push}
                      />
                    </Col>
                  );
              }
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

ShowRecipes.propTypes = {
  listInfo: PropTypes.array
};

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});
export default connect(mapStateToProps, { fetchBooksList })(ShowRecipes);