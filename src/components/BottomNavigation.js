import React, { Component } from "react";

class BottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const offset = this.props.navigation.offset;
    const start = offset + 1;
    const end = offset + this.props.count;
    const total = this.props.navigation.total;

    if (total === 0) {
      return null;
    }

    return (
      <div>
        <button onClick={this.props.onPrev} disabled={offset === 0}>
          Prev
        </button>
        {`  ${start} - ${end} of ${total}  `}
        <button onClick={this.props.onNext} disabled={end === total}>
          Next
        </button>
      </div>
    );
  }
}

export default BottomNavigation;
