import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      jokes.push({ text: res.data.joke, votes: 0, id: uuidv4() });
    }

    this.setState({ jokes });
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-list">
          {this.state.jokes.map((joke) => (
            <Joke
              key={joke.id}
              id={joke.id}
              text={joke.text}
              votes={joke.votes}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
