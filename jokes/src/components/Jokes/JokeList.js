import React, { Component } from 'react';

class JokeList extends Component {
    constructor(props){
        super(props);
}


    render() {
        return (
            <div>
                <ul>
                    {this.props.jokes.map(joke=>{
                  return  <li key={joke.id}>{joke.setup}, {joke.punchline}</li>
                })}
                </ul>
            </div>
        );
    }
}

export default JokeList;
