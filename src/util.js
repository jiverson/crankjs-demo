export const STORAGE_KEY = "todos-crank"

export const ENTER_KEY = 13
export const ESC_KEY = 27

export function getStorage() {
    let todos = []
    let nextTodoId = 0

    try {
        const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if (Array.isArray(storedTodos) && storedTodos.length) {
            todos = storedTodos
            nextTodoId = Math.max(...storedTodos.map((todo) => todo.id)) + 1
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    } catch (err) {
        localStorage.removeItem(STORAGE_KEY)
    }

    return { todos, nextTodoId }
}

export function setStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
