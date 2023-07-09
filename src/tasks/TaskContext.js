import  React, {createContext} from "react";
import { useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
    const findById = (elem, id) => elem.find((task) => task.id === parseInt(id));
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks, isLoaded])
    useEffect(() => {
        if (isLoaded) {
            setIdCounter(tasks.length);
        }
    }, [tasks, isLoaded])
    useEffect(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            setTasks(JSON.parse(tasks))
        }
        setIsLoaded(true);
    }, [])
    const [states] = useState([
        {id: 1, name: 'backlog', state: 'backlog'},
        {id: 2, name: 'ready', state: 'ready'},
        {id: 3, name: 'in progress', state: 'inProgress'},
        {id: 4, name: 'finished', state: 'finished'}
    ]);
    const context = {
        states,
        addTask: (name) => {
            const id = idCounter + 1;
            const task = {
                id,
                name,
                state: 'backlog'
            }
            setIdCounter(id);
            setTasks([...tasks, task])
        },
        updateTask: (item) => {
            const task = findById(tasks, item.id);
            if (item.name) task.name = item.name;
            item.description ? task.description = item.description : task.description = '';
            setTasks([...tasks]);
        },
        getTaskById: (id) => findById(tasks, id),
        getPrevState: (stat) => {
            let tempId = states.find(state => state.state === stat).id - 1;
            let tempState = findById(states, tempId);
            return tempId > 0 ? tempState.state : 'backlog'
        },
        getTasksByState: (state) => {
            return tasks.filter(task => task.state === state);
        },
        getOtherTasksByState: (state) => {
            return tasks.filter(task => task.state !== state);
        },
        moveTask: (id, state) => {
            const task = findById(tasks, id);
            if (task) {
                task.state = state;
            }
            setTasks([...tasks]);
        },
    }
    return (
        <TaskContext.Provider value={context}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;