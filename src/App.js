import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      items: []
    }
    this.addRef = React.createRef()
    this.modifyRef = React.createRef()
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
    this.modify = this.modify.bind(this)
    this.get = this.get.bind(this)
    this.complete = this.complete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  add(e) {
    e.preventDefault()
    const data = {
      text: this.state.text
    }
    fetch("https://cse204.work/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "73149f-473dda-2c121d-8c6cc0-efa8b5"
      }
    })
    .then(res => res.json())
    .then(res => {
      this.addRef.current.value = ""
      this.modifyRef.current.value = ""
      this.get()
    })
    .catch(err => console.log(err))
  }

  delete(e) {
    e.preventDefault()
    let id = this.state.items[e.target.name].id
    console.log("id", id)
    fetch(`https://cse204.work/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "73149f-473dda-2c121d-8c6cc0-efa8b5"
      }
    })
    .then(res => {
      this.get()
    })
    .catch(err => console.log(err))
  }

  modify(e) {
    e.preventDefault()
    let id = this.state.items[e.target.name].id
    let data = {
      text: this.state.text
    }
    fetch(`https://cse204.work/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "73149f-473dda-2c121d-8c6cc0-efa8b5"
      }
    })
    .then(res => res.json())
    .then(res => {
      this.addRef.current.value = ""
      this.modifyRef.current.value = ""
      this.get()
    })
    .catch(err => console.log(err))
  }

  get() {
    fetch("https://cse204.work/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "73149f-473dda-2c121d-8c6cc0-efa8b5"
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        items: res
      })
    })
    .catch(err => console.log(err))
  }

  complete(e) {
    e.preventDefault()
    let id = this.state.items[e.target.name].id
    let comp = this.state.items[e.target.name].completed
    let data = {
      completed: !comp
    }
    fetch(`https://cse204.work/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "73149f-473dda-2c121d-8c6cc0-efa8b5"
      }
    })
    .then(res => res.json())
    .then(res => {
      console.table("compjson", res)
      this.get()
    })
    .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  componentDidUpdate() {
    console.log("component has updated!")
  }

  componentWillMount() {
    this.get()
  }

  render() {
    return (
      <div className="center">
        <h1>Todo App</h1>

        <form onSubmit={this.add}>
          <input ref={this.addRef}type="text" onChange={this.handleChange} name="text" placeholder="Type todo here"/>
          <input type="submit" value="Add todo"/>
        </form>

        <h2>All Todos</h2>

        {
          this.state.items.map((item,k) => {
            return (
              <div key={item.id}>
                <p className={item.completed ? "slash" : ""}>{item.text}</p>
                <input ref={this.modifyRef} onChange={this.handleChange} type="text" placeholder="Modify todo here"/>
                <br/>
                <button onClick={this.modify} name={k}>Modify</button>
                <br/>
                <button onClick={this.complete} name={k}>Toggle Complete</button>
                <br/>
                <button onClick={this.delete} name={k}>Delete</button>
              </div>
            )
          })
        }

      </div>
    )
  }
}

export default App;
