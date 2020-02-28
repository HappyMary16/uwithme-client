import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

let styles = {
  rootElem: {
    position: 'fixed',
    backgroundColor: '#D3D3D3',
    opacity: '0.5',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    zIndex: 16777271,
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto'
  },
  loader: {
    margin: 'auto',
    maxHeight: '100%'
  }
};

export class Preloader extends Component {
  render() {
    return (
      <div className="preloader_wrapper" style={styles.rootElem}>
        <Loader
          type="Oval"
          color="#9370DB"
          height={200}
          width={200}
          style={styles.loader}
        />
      </div>
    );
  }
}
