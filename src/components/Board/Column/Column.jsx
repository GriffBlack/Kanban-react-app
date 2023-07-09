import React, { useState, useEffect } from 'react';
import { Card } from './Card/Card';
import  { useTasks } from '../../../tasks/use-tasks';
import './Button.css';
import './Column.css';

export const Column = (props) => {
    const [textBtn, setBtn] = useState('Add card');
    const [styleBtn, setStyleBtn] = useState('btn');

    const [inputShown, setInputShown] = useState('none');
    const [selectShown, setSelectShown] = useState('none');
    const [isNewOtherTask, setOtherTask] = useState(false);

    const [selectedTaskId, setSelectedTaskId] = useState(undefined);
    
    const [inputCardName, setInputCardName] = useState('');
    const { getTasksByState, addTask, getOtherTasksByState, moveTask, getPrevState} = useTasks();
    
    const tasks = getTasksByState(props.state);
    const otherTask = getTasksByState(getPrevState(props.state));
    const hasTasks = otherTask.length > 0;
    const setBtnAdd = (hasTasks) => {
        if (hasTasks) {
            setOtherTask(true);
        } else {
            setOtherTask(false)
        }
    }

    useEffect(() => {
        setBtnAdd(hasTasks);
    }, [hasTasks])
    
    const onInputCard = (e) => {
        setInputCardName(e.target.value);
    }

    const btnClickAdd = () => {
        if (props.state === 'backlog') {
            setSelectShown('none');
            setInputShown(true);
            if (textBtn === 'Submit') {
                if (inputCardName !== '') {
                    setOtherTask(true);
                    addTask(inputCardName);
                }
                setInputCardName('');
                setInputShown('none');
            }
        } else {
            setInputShown('none');
            setSelectShown(true);
            if (textBtn === 'Submit') {
                moveTask(selectedTaskId, props.state);
                setSelectedTaskId('');
                setSelectShown('none');
                if (!getOtherTasksByState(props.state)) setOtherTask(false);
            }
        }
        styleBtn === 'btn' ? setStyleBtn('btn submit') : setStyleBtn('btn');
        textBtn === 'Add card' ? setBtn('Submit') : setBtn('Add card');
    }
    return (
        <div className='column'>
            <div className='column_header'>{props.name}</div>

            <div className='column_wrapper'>
                <div className='column_wrapper-body'>
                    {
                        tasks.map((task) =>
                            <Card key={task.id} id={task.id} name={task.name}/>)
                    }
                </div>
                <div>
                <input className='input_task' style={{display: inputShown}} onInput={onInputCard} value={inputCardName}/>
                </div>
                <select className='columb_select'
                    style={{ display: selectShown }}
                    onChange={(e) =>
                        setSelectedTaskId(e.target.value)}>
                    <option>Choose your destiny</option>
                    {getTasksByState(getPrevState(props.state)).map((task) =>
                        <option key={task.id} value={task.id}>{task.name}</option>
                    )}
                </select>
            </div>
            
            <div className='column_footer'>
                <div className='button-wrapper'>
                    <button className={styleBtn} disabled={(props.state === 'backlog' || isNewOtherTask) ? false : true} onClick={ btnClickAdd }>{textBtn}</button>
                </div> 
          </div>
        </div>
    )
}
