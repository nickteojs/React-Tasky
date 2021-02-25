export const taskReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            const id = Math.floor(Math.random() * 10000) + 1;
    // Takes task info and makes an object
            return [...state, {
                id: id,
                text: action.task.text,
                day: action.task.day,
                reminder: action.task.reminder
            }]
        case 'REMOVE_TASK':
            return state.filter((task) => task.id !== id)
        case 'TOGGLE_REMINDER':
            return state.map((task) => task.id === id 
            ? {...state, reminder: !task.reminder} : task)
        default:
            return state
    }
}