import React from 'react';
import { useTasks } from '../../tasks/use-tasks';
import './Footer.css'

export const Footer = () => {
    const { getTasksByState } = useTasks();
    const sumActive = getTasksByState('inProgress').length + getTasksByState('ready').length;
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                <div className="counters">
                    <div className="tasks">Active Tasks: {sumActive}</div>
                    <div className="tasks">Finished Tasks: {getTasksByState('finished').length}</div>
                </div>
                <div className="tasks">Kanban board by Maikl, 2023</div>
            </div>
        </footer>
    )
}