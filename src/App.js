import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import './App.css';
import axios from 'axios';
const url = 'https://jsonplaceholder.typicode.com';
class App extends Component {

    state = {
        todos: []
    }
    componentDidMount() {
        axios.get(`${url}/todos?_limit=10`)
            .then(res => this.setState({ todos: res.data }))
    }
    //Toggle complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    }

    //Delete Todo
    delTodo = (id) => {
        axios.delete(`${url}/todos/${id}`)
            .then(res => this.setState({
                todos:
                    [...this.state.todos.filter(todo => todo.id !== id)]
            }));
    }

    //Add Todo
    addTodo = (title) => {
        axios.post(`${url}/todos`, {
            title,
            completed: false
        })
            .then(res => this.setState({
                todos:
                    [...this.state.todos, res.data]
            }));
    }

    render() {
        return (
            <Router>
                <div className="App" >
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                            </React.Fragment>
                        )} />
                        <Route path="/about" component={About} />

                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
