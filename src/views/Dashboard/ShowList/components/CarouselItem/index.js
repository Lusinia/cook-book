import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'reactstrap';
import { SLIDING_TIME, SM_WIDTH } from '../../../../../constants';
import RecipeItem from '../RecipeItem';


class CarouselComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.setSliding();
  }

  setSliding() {
    setInterval(() => {
      this.next();
    }, SLIDING_TIME);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.data.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.data.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.props.data.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          previous={this.previous}
          key={item.name}
        >
          <RecipeItem
            data={item}
            isHorizontal={window.innerWidth >= SM_WIDTH}
            changeRoute={this.props.changeRoute}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {this.props.data && slides}
      </Carousel>
    );
  }
}


CarouselComponent.propTypes = {
  data: PropTypes.array,
  changeRoute: PropTypes.func
};

export default CarouselComponent;