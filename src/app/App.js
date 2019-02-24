import React from 'react';
import Form from './components/form';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      title:'',
      description:'',
      tasks: [],
      _id:''
    }
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/task')
      .then(res => res.json())
      .then(data => {
        this.setState({ tasks: data })
        console.log(this.state);
      });
  }

  addTask(e) {
    e.preventDefault();

    if (this.state._id){
      fetch(`/api/task/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        M.toast({html: 'Task Edited'});
        this.setState({title: '', description: ''});
        this.fetchTasks();
      });
    } else {
      fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        M.toast({html: 'Task Saved'});
        this.setState({title: '', description: '', _id:''});
        this.fetchTasks();
      })
      .catch(err => console.log(err));
    }
  }

  editTask(id) {
    fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        })
      })
  }

  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')){
      fetch(`/api/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        M.toast({html: 'Task Deleted'});
        this.fetchTasks();
      })
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: [value] })
  }

  render(){
    return(
      <div>
        <nav className="light-blue darken-4">
          <a href="/" className="brand-logo">MERN Stack</a>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <Form
                    title={this.state.title}
                    description={this.state.description}
                    addTask={ this.addTask }
                    handleChange={ this.handleChange }
                  />
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.tasks.map((x, i) => {
                    return (
                      <tr key={`task-${i}`}>
                        <td>{x.title}</td>
                        <td>{x.description}</td>
                        <td>
                          <button className="btn green" onClick={() => this.editTask(x._id)}>
                            <i className="material-icons">edit</i>
                          </button>
                          <button className="btn red" onClick={() => this.deleteTask(x._id)}>
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;