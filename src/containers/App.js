import React, { Component } from "react"
import CardList from "../components/CardList"
import SearchBox from "../components/SearchBox"
import "./App.css"
import Scroll from "../components/Scroll"
import ErrorBoundary from "../components/ErrorBoundary"

class App extends Component {
  constructor() {
    // @ts-ignore
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
    const { robots, searchfield } = this.state
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ? (
      <h1>Loading. . .</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">RobotFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }
}

export default App
