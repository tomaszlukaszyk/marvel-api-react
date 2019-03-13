import React, { Component } from "react";

const CATEGORY_PROP = {
  comics: "title",
  characters: "name",
  series: "title"
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>;
    }
    if (this.props.results.length === 0) {
      return <p>Nothing to show</p>;
    }
    const category = CATEGORY_PROP[this.props.category];
    const results = this.props.results.map(result => (
      <li key={result.id}>{result[category]}</li>
    ));
    return <ul>{results}</ul>;
  }
}

export default Results;
