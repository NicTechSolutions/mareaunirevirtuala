import React from 'react';

export default class Counter extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div>Counter</div>
        <a href={window.drawingUrl} className="button" download="My-Romania.png">DESCARCĂ</a>
      </React.Fragment>
    );
  }
}
