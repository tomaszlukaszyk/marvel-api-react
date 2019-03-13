import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import BottomNavigation from "./components/BottomNavigation";
import "./App.css";

const API_KEY = "&apikey=62a916d25516dbb33f8fce24264813e2";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/";
const CATEGORY_URL = {
  comics: "comics?titleStartsWith=",
  characters: "characters?nameStartsWith=",
  series: "series?titleStartsWith="
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchTerm: "",
      searchCategory: "comics",
      results: [],
      resultsCategory: "",
      navigation: {
        offset: 0,
        total: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange(value) {
    this.setState({ searchTerm: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        navigation: {
          offset: 0,
          total: 0
        }
      },
      () => {
        this.fetchResults();
      }
    );
  }

  fetchResults() {
    this.setState({ isLoading: true });
    fetch(
      BASE_URL +
        CATEGORY_URL[this.state.searchCategory] +
        this.state.searchTerm +
        "&offset=" +
        this.state.navigation.offset +
        API_KEY
    )
      .then(response => response.json())
      .then(data => {
        const navigation = { ...this.state.navigation };
        navigation.total = data.data.total;
        this.setState({
          results: data.data.results,
          resultsCategory: this.state.searchCategory,
          isLoading: false,
          navigation
        });
      });
  }

  handleSelect(value) {
    this.setState({ searchCategory: value });
  }

  handlePrev() {
    const navigation = { ...this.state.navigation };
    navigation.offset -= 20;
    this.setState({ navigation }, () => {
      this.fetchResults();
    });
  }

  handleNext() {
    const navigation = { ...this.state.navigation };
    navigation.offset += 20;
    this.setState({ navigation }, () => {
      this.fetchResults();
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          value={this.state.searchTerm}
          selectValue={this.state.searchCategory}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onSelect={this.handleSelect}
        />
        <Results
          isLoading={this.state.isLoading}
          results={this.state.results}
          category={this.state.resultsCategory}
        />
        <BottomNavigation
          navigation={this.state.navigation}
          count={this.state.results.length}
          onPrev={this.handlePrev}
          onNext={this.handleNext}
        />
      </div>
    );
  }
}

export default App;
