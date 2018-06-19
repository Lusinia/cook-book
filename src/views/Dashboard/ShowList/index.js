import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { SM_WIDTH } from '../../../constants';
import { getUserInfo } from '../../../redux/actions/authentication';
import { fetchBooksList } from '../../../redux/actions/fetchRecipes';
import CarouselComponent from './components/CarouselItem';
import RecipeItem from './components/RecipeItem';
import './styles.scss';


class ShowRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInfo: []
    };
    this.filterData = this.filterData.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchBooksList();
    await this.props.getUserInfo();
    await this.setState({ listInfo: this.props.listInfo });
  }

  async filterData(event) {
    const data = event.target.value.toUpperCase();
    if (data.length) {
      let list = [...this.state.listInfo];
      const regexp = new RegExp(data, 'g');
      const listInfo = list.filter(item => (
        item.name.toUpperCase().search(regexp) !== -1 ||
        item.description.toUpperCase().search(regexp) !== -1
      ));
      await this.setState({ listInfo });
    } else {
      await this.setState({ listInfo: this.props.listInfo });
    }
  }


  render() {
    return (
      <div className="show-recipes">
        <div className="banner-wrapper">
          <InputGroup>
            <h1 className='title'>Find a Recipe</h1>
            <InputGroupAddon addonType="prepend">
              <i className="fa fa-search" aria-hidden="true"/>
            </InputGroupAddon>
            <Input
              onChange={this.filterData}
              type="search"
              name="search"
              id="search"
            />
          </InputGroup>
        </div>
        <Container>
          <Row>
            {this.state.listInfo
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
                        <CarouselComponent
                          data={this.state.listInfo}
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
  listInfo: PropTypes.array,
  fetchBooksList: PropTypes.func,
  getUserInfo: PropTypes.func
};

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});

export default connect(mapStateToProps, { fetchBooksList, getUserInfo })(ShowRecipes);