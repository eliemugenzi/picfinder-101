import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResult from "./ImageResults";
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      amount: 15,
      apiUrl: "https://pixabay.com/api",
      apiKey: "8761127-15c354fd40a23de8d36bfe25d",
      images: []
    };
  }

  onTextChange = e => {
    e.preventDefault();
    const val = e.target.value;
    this.setState(
      {
        searchText: val
      },
      () => {
        if (val === "") {
          this.setState({
            images: []
          });
        } else {
          const { searchText, apiUrl, apiKey, amount } = this.state;
          axios
            .get(
              `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
            )
            .then(res => this.setState({ images: res.data.hits }))
            .catch(err => console.log(err));
        }
      }
    );
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange.bind(this)}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange.bind(this)}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResult images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
