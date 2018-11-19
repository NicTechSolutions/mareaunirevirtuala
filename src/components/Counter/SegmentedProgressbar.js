import React from 'react';
//import { render } from 'react-dom';
import _ from 'lodash';
//import CircularProgressbar from 'react-circular-progressbar';
import StyledProgressbar from './StyledProgressbar';

// Component that renders an arbitrary
// number of divs on top of CircularProgressbar,
// whose content is centered.
function LayeredProgressbar(props) {
  const { renderOverlays, ...otherProps } = props;
  const overlayStyles = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const overlays = props.renderOverlays();
  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
      }}
    >
      <div style={{ position: 'absolute' }}>
        <StyledProgressbar {...otherProps} textForPercentage={null} />
      </div>
      {overlays.map((overlay, index) => (
        <div style={overlayStyles} key={index}>
          {overlay}
        </div>
      ))}
    </div>
  );
}

function RadialSeparator(props) {
  return (
    <div
      style={{
        background: '#fff',
        width: '3px',
        height: '100%',
        transform: `rotate(${props.degrees}deg)`,
      }}
    />
  );
}

// Expects an even number of separators.
// Can be implemented with non-even numbers
// but requires changing the styling of LayeredProgressbar
function getRadialSeparators(numSeparators) {
  const degrees = 360 / numSeparators;
  return _.range(numSeparators / 2).map(index => (
    <RadialSeparator degrees={index * degrees} />
  ));
}

function SegmentedProgressbar(props) {
  return (
    <LayeredProgressbar
      percentage={props.percentage}
      styles={{
        path: {
          strokeLinecap: 'butt',
        },
      }}
      renderOverlays={() =>
        getRadialSeparators(20).concat(
          <div style={{ fontSize: 50, color: '#f88' }}>
            {props.percentage}%
          </div>,
        )
      }
    />
  );
}

export default SegmentedProgressbar;
