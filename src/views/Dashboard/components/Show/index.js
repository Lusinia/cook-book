import PropTypes from "prop-types";
import React, { Component } from "react";

import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { fetchBooksList } from "../../../../redux/actions/fetchRecipes";
import ItemsList from "./components/ItemsList";
import "./styles.scss";


class ShowRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentItem: null
    };
  }

  async componentDidMount() {
    await this.props.fetchBooksList();

    const path = this.props.location.pathname;
    const id = path.substring(1, path.length);
    await this.setState({
      currentItem: this.props.listInfo.find(i => i._id === id)
    });
  }

  render() {
    console.log("ShowRecipe", this.state);
    return (
      <div className="show-recipe">
        <Container>
          {this.state.currentItem &&
          <div>
            <Row>
              <Col>
                <div className="image-wrapper">
                  <img src={this.state.currentItem.imageURL} alt="recipe image"/>
                  <div className="crop-image"></div>
                  <div className="image-title">
                    <h1 className="image-title__text">
                      {this.state.currentItem.name}
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              < Col  sm={{ size: 12, order: 2}}  md={{ size: 8, order: 1}}>
                <p className="item-description">
                  {this.state.currentItem.description}
                </p>
                <ItemsList
                  title='Steps to reproduce'
                  items={this.state.currentItem.steps}
                  isStep={true}
                />

              </Col>
              <Col sm={{ size: 12, order: 1}} md={{ size: 4, order: 2}}>
                <ItemsList
                  title='Ingredients'
                  items={this.state.currentItem.ingredients}
                />
                <ItemsList
                  title='Categories'
                  items={this.state.currentItem.category}
                />
                <ItemsList
                  title='Total time'
                  items={this.state.currentItem.time}
                />
              </Col>
            </Row>
          </div>
          }
        </Container>
      </div>
    );
  }
}


ShowRecipe.propTypes = {
  listInfo: PropTypes.array,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  listInfo: state.recipesList.recipesList
});

export default connect(mapStateToProps, { fetchBooksList })(ShowRecipe);