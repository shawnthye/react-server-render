import React, {Component} from 'react';

export default class Example extends Component {
  render() {
    console.log("./Example", "render");
    return (
        <div>
          <h1>Hello from a loadable component</h1>
        </div>
    );
  }
}
