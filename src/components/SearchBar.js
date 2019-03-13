import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <label>Search</label>
        <select
          value={this.props.selectValue}
          onChange={e => this.props.onSelect(e.target.value)}
        >
          <option value="comics">Comics</option>
          <option value="characters">Characters</option>
          <option value="series">Series</option>
        </select>
        <form onSubmit={e => this.props.onSubmit(e)}>
          <input
            type="text"
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
            required
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
