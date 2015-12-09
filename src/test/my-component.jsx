import React from "react";

class MyComponent extends React.Component {
  render() {
    return <html><body>Hello {this.props.name}</body></html>;
  }
}

export default MyComponent;
