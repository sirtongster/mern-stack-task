import React from 'react';

class Form extends React.Component{
  render(){
    const { title='', description='', addTask, handleChange } = this.props;
    return(
      <form action="" onSubmit={ addTask }>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="title" 
              type="text"
              placeholder="task title"
              value={title}
              onChange={ handleChange }
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              className="materialize-textarea" 
              name="description"
              placeholder="task description"
              value={description}
              onChange={ handleChange }
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn light-blue darken-4">
          Send
        </button>
      </form>
    )
  }
}

export default Form;