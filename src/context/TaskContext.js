import React, { createContext } from 'react'

export const TaskContext = createContext();

export const TaskProvider = props => {
    return (
        <TaskContext.Provider>
            {props.children}
        </TaskContext.Provider>
    );
};