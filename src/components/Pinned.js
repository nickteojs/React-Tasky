import React from 'react'

const Pinned = ({ pinnedTasks }) => {
    return (
        <div className="pinned-task">
            <p>• {pinnedTasks.text} ({pinnedTasks.timeDifferenceinDays} days left)</p>
        </div>
    )
}

export default Pinned
