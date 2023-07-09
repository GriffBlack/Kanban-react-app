import { useParams, useNavigate } from 'react-router-dom'
import {useEffect, useState} from "react";

import {useTasks} from "../../../tasks/use-tasks";

import './CardInner.css'

export const CardInner = (props) => {
    const navigate = useNavigate();
    const {cardId} = useParams();
    const {getTaskById, updateTask} = useTasks();
    const [task, setTask] = useState();

    const navigateBack = () => {
        console.log(task)
        updateTask(task)
        console.log(task)
        navigate(-1)
    };

    useEffect(() => {
        if (cardId) {
            setTask(getTaskById(cardId))
        }
    }, [cardId, getTaskById])


    return (
        <div className="info-wrapper">
            {task && 
                <div className="infoblock">
                    <div className="infoblock-header">
                        <textarea className='name'
                          value={task.name}
                          onChange={(e) =>
                            setTask({
                                ...task,
                                name: e.target.value
                            })}
                        />
                        <span className="close" onClick={navigateBack}>✖</span>
                    </div>
                    <textarea className='description'
                        onChange={(e) =>
                            setTask({
                                ...task,
                                description: e.target.value
                            })}
                        value={task.description ? task.description : 'This task has no description'}
                    />
                </div> 
            
            }
        </div>
    );
}
