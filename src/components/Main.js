/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { TodoItem } from "./TodoItem"

export function Main({ todos, filter }) {
    const completed = todos.every((todo) => todo.completed)

    this.addEventListener("click", (ev) => {
        if (ev.target.className === "toggle-all") {
            this.dispatchEvent(
                new CustomEvent("todo.toggleAll", {
                    bubbles: true,
                    detail: { completed: !completed },
                })
            )
        }
    })

    if (filter === "active") {
        todos = todos.filter((todo) => !todo.completed)
    } else if (filter === "completed") {
        todos = todos.filter((todo) => todo.completed)
    }

    return (
        <section class="main">
            <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                checked={completed}
            />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                {todos.map((todo) => (
                    <TodoItem todo={todo} crank-key={todo.id} />
                ))}
            </ul>
        </section>
    )
}
