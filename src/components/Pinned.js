import React from 'react'

const Pinned = ({ pinnedTasks }) => {
    return (
        <div className="pinned-task">
            <p>- {pinnedTasks.text}</p>
        </div>
    )
}

export default Pinned
