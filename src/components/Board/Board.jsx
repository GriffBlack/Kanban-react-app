import React from 'react';
import { useTasks } from '../../tasks/use-tasks';
import './Board.css'
import { Column } from './Column/Column';
export const Board = () => {
    const {states} = useTasks();
    return (
        <div className='board-wrapper'>
            {states.map(
                (state) =>
                    <Column key={state.id} name={state.name} state={state.state}/>
            )}
        </div>
    )
}