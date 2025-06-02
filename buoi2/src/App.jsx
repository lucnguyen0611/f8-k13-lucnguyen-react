import './App.css'
import { useState } from 'react';
import ItemTodo from './components/ItemTodo/index';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [jobs , setJobs] = useState([])

  const onInput = (event) => {
    setInputValue(event.target.value);
  };

  const onAddJob = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue === '') return;
    if (jobs.includes(trimmedValue)) {
      alert('Task already exists!');
      return;
    }
    
    setJobs([...jobs, trimmedValue]);
    setInputValue('');
  }
  

  const removeE = (indexE) => {
  const updatedJobs = jobs.filter((job, index) => index !== indexE);
  setJobs(updatedJobs);
};

  return (
    <>
        <div className="App">
            <div className="TodoWrapper">
                <h1>Get Things Done !</h1>
                <form className="TodoForm"  onSubmit={onAddJob}>
                    <input type="text" className="todo-input" placeholder="What is the task today?" onInput={onInput} value={inputValue} />
                    <button type='submit' className="todo-btn">Add Task</button>
                </form>
                {
                  jobs.map((job, index) => {
                    return (
                      <ItemTodo
                        key = {index}
                        job = {job}
                        index = {index}
                        onClick = {removeE}

                      />
                    )
                  })
                }
            </div>
        </div>
    </>
  )
}

export default App
