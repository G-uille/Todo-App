import "./App.css";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import CardTask from "./components/Card/CardTask.tsx";
import Button from "@mui/material/Button";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardCompletedTasks from "./components/Card/CardCompletedTasks.tsx";
import useTaskNumberUpdate from "./hooks/useTaskNumberUpdate.tsx";
import { TransitionGroup } from "react-transition-group";
import ModalDeleteTask from "./components/Modal/ModalDeleteTask.tsx";

interface Task {
  idTask: string;
  task: string;
}

interface TaskListProps {
  taskNumber: number;
  tasksArray: Task[];
  onRemove: (idTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ taskNumber, tasksArray, onRemove }) => {
  return (
    <div className="container-tasks">
      {taskNumber > 0 ? (
        <TransitionGroup className="container-transition">
          {tasksArray.map((task) => (
            <Collapse key={task.idTask} sx={{ width: "100%" }}>
              <CardTask
                task={task.task}
                handleClick={() => onRemove(task.idTask)}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <CardCompletedTasks />
      )}
    </div>
  )
};

const App: React.FC = () => {
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [taskNumber, setTaskNumber] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useTaskNumberUpdate({ tasksArray, setTaskNumber });

  const handleAddTask = useCallback(  () => {
    const uniqueId = uuidv4();

    if (taskInput !== "") {
      setTasksArray((prevTask) => [
        ...prevTask,
        { idTask: uniqueId, task: taskInput },
      ]);
      setTaskInput("");
    }
  }, [taskInput]);

  const removeTask = useCallback((idTask: string) => {
      let task_filtered = tasksArray.filter((task) => task.idTask !== idTask);
      setTasksArray(task_filtered);
  }, [tasksArray]);

  const handleDeleteAllTasks = useCallback(() => {
    setTasksArray([]);
    setOpenModal(false);
  }, []);

  return (
    <div className="App">
      <div className="container-todo-app">
        <h1 className="todo-app__title">Todo App</h1>
        <div className="container-row">
          <TextField
            id="outlined-basic"
            label="Add your new todo"
            variant="outlined"
            className="input-todo-app"
            onChange={(e) => setTaskInput(e.target.value)}
            value={taskInput}
          />
          <IconButton className="icon-button" onClick={handleAddTask}>
            <Add />
          </IconButton>
        </div>

        <TaskList
          taskNumber={taskNumber}
          tasksArray={tasksArray}
          onRemove={removeTask}
        />

        {taskNumber > 0 && (
          <div className="container-task-number-with-clear">
            <span>You have {taskNumber} pending tasks</span>
            <Button variant="contained" onClick={() => setOpenModal(true)}>Clear All</Button>
          </div>
        )}

        <ModalDeleteTask
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleDelete={handleDeleteAllTasks} />

      </div>
    </div>
  );
}

export default App;
