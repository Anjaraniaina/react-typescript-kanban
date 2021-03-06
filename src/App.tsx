import React, { ButtonHTMLAttributes, useRef, useState } from 'react';


type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}


function App() {

  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();

    addTask(newTask)
    setNewTask("");
    taskInput.current?.focus();
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const handleDelete = (index: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks); 
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={event => setNewTask(event.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                />
                <button className="button btn-sucess btn-block mt-2">Add</button>
              </form>
              {
                tasks.map((task: ITask, index: number) => (
                  <div className="card card-body mt-2" key={index}>  
                    <h3 style={{textDecoration: task.done ? "line-through" : "none" }}>{task.name}</h3>

                    <button onClick={() => handleDelete(index)}>Remove</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
