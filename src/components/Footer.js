/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { Filters } from "./Filters"

export function Footer({ todos, filter }) {
    const completed = todos.filter((todo) => todo.completed).length
    const remaining = todos.length - completed

    this.addEventListener("click", (ev) => {
        if (ev.target.className === "clear-completed") {
            this.dispatchEvent(
                new Event("todo.clearCompleted", { bubbles: true })
            )
        }
    })

    return (
        <footer class="footer">
            <span class="todo-count">
                <strong>{remaining}</strong>{" "}
                {remaining === 1 ? "item" : "items"} left
            </span>
            <Filters filter={filter} />
            {!!completed && (
                <button class="clear-completed">Clear completed</button>
            )}
        </footer>
    )
}
