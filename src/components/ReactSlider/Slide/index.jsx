import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Slide.module.sass';
import defImage from './question-mark.jpg';

class Slide extends Component {
  constructor (props) {
    super(props);

    const img = new Image();
    img.addEventListener('load', this.handleLoad);
    img.addEventListener('error', this.handleError);

    this.state = {
      img,
      isLoaded: false,
      error: null,
    };
  }

  handleLoad = () => {
    this.setState({ isLoaded: true });
  };

  handleError = () => {
    this.setState({ error: true });
  };

  componentDidMount () {
    this.load();
  }

  componentDidUpdate (prevProps, prevState) {
    const { src } = this.props;
    const { isLoaded, error } = this.state;
    if (!isLoaded && !error) {
      this.load();
    }
    if (src !== prevProps.src) {
      this.setState({ isLoaded: false, error: null });
    }
  }

  load = () => {
    const { src } = this.props;
    const { img } = this.state;
    img.src = src;
  };

  render () {
    const { src, title, description, isCurrent } = this.props;
    const { isLoaded, error } = this.state;
    const figureClassName = isCurrent ? styles.currentSlide : styles.slide;
    return (
      <>
        {error && <p className={styles.error}>An error are occurred</p>}
        <figure className={figureClassName}>
          <img src={isLoaded ? src : defImage} alt='defImage' />
          <figcaption>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </figcaption>
        </figure>
      </>
    );
  }
}

Slide.propTypes = {
  src: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  isCurrent: PropTypes.bool,
};

Slide.defaultProps = {
  src: defImage,
  title: 'Unknown',
  description: 'There are no information about the photo',
  isCurrent: false,
};

export default Slide;
