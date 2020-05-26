import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BankData from './components/bankData';
import NavBar from './components/navBar';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_data: [],
      filteredData: [],
      currentPage: 1,
      postsPerPage: 10,
      city: 'MUMBAI',
      category: '',
      searchInput: ''
    }
  }

  populateDataForNewCity = async (city) => {
    if (localStorage.getItem(city.toLocaleLowerCase()) === null) {
      const response = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`);
      console.log('API CALL MADE')
      this.setState({ bank_data: response.data, filteredData: response.data })
      localStorage.setItem(city.toLocaleLowerCase(), JSON.stringify(response.data))
    } else {
      console.log("NO API CALL MADE")
      let cachedData = JSON.parse(localStorage.getItem(city.toLocaleLowerCase()));
      this.setState({ bank_data: cachedData, filteredData: cachedData })
      console.log('cache', cachedData)
    }

  }

  componentDidMount() {

    this.populateDataForNewCity(this.state.city)
  }

  handleNavigationClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }
  handleSelectPage = (e) => {
    this.setState({ postsPerPage: e.target.value })
  }
  handleCityChange = (e) => {
    this.setState({ city: e.target.value })
    console.log(this.state.city);
    this.populateDataForNewCity(e.target.value)
  }
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value })
    console.log(this.state.category)
  }
  handleInputChange = (event) => {
    if (event.target.value == '') {
      this.populateDataForNewCity(this.state.city)
    }
    this.setState({ searchInput: event.target.value })
    setTimeout(() => {
      this.filterData(this.state.searchInput)
    }, 2500);
  }


  filterData = (searchInput) => {
    console.log(searchInput)
    if (searchInput != '') {
      let searchResult = [...this.state.bank_data];
      let temp = searchResult.filter(item => {
        if (this.state.category != 'bank_id') {
          return item[this.state.category].toLowerCase().includes(searchInput.toLowerCase())
        } else {
          let stringNum = '' + item[this.state.category]
          return stringNum.includes(searchInput);
        }
      })
      console.log('temp', temp)
      this.setState({ filteredData: temp })
    } else {
      this.setState({ filteredData: this.state.bank_data })
    }
  }
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentBankDetails = this.state.filteredData.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <div className="app">
        <NavBar />
        <div className='main_content_wrapper'>
          <div className='main_content_header'></div>
          <BankData bankDetails={currentBankDetails}
            handleCityChange={this.handleCityChange}
            handleCategoryChange={this.handleCategoryChange}
            handleInputChange={this.handleInputChange}
            filteredData={this.state.filteredData}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            currentPage={this.state.currentPage}
            handleNavigationClick={this.handleNavigationClick}
            handleSelectPage={this.handleSelectPage}
            postsPerPage={this.state.postsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default App;
