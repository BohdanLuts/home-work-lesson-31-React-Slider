import React, { Component } from 'react';
import Slide from './Slide';
import styles from './ReactSlider.module.sass';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

class Carousel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isFullScreen: false,
      isPlaying: false,
      delay: 1000,
    };
  }

  get prevIndex () {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    return (currentIndex - 1 + slides.length) % slides.length;
  }

  get nextIndex () {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    return (currentIndex + 1) % slides.length;
  }

  prevSlide = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    this.setState({
      currentIndex: (currentIndex - 1 + slides.length) % slides.length,
    });
  };

  nextSlide = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    this.setState({
      currentIndex: (currentIndex + 1) % slides.length,
    });
  };

  render () {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    return (
      <article className={styles.container}>
        <Slide {...slides[this.prevIndex]} />
        <Slide {...slides[currentIndex]} isCurrent />
        <Slide {...slides[this.nextIndex]} />
        <div className={styles.buttonContainer}>
          <button onClick={this.prevSlide} className={styles.buttWrapperPrev}>
            {<FaArrowAltCircleLeft className={styles.buttPrev} />}
          </button>
          <button onClick={this.nextSlide} className={styles.buttWrapperNext}>
            {<FaArrowAltCircleRight className={styles.buttNext} />}
          </button>
        </div>
      </article>
    );
  }
}
export default Carousel;
