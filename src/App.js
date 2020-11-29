import React, { Component } from "react"
import CardList from "./CardList"
import SearchBox from "./SearchBox"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: "",
    }
  }
  // USe function expression in react
  onSearchChange = (event) => {
    this.setState({ searchfield: `${event.target.value}` })
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        this.setState({ robots: users })
      })
    // this.setState({ robots: robots })
  }

  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase())
    })
    if (this.state.robots.length === 0) {
      return <h1>Loading. . .</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f2">RobotFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filteredRobots} />
        </div>
      )
    }
  }
}

export default App
