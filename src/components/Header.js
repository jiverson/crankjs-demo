/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { ENTER_KEY } from "../util"

export function* Header() {
    let title = ""

    this.addEventListener("input", (ev) => {
        title = ev.target.value
    })

    this.addEventListener("keydown", (ev) => {
        if (ev.target.tagName === "INPUT" && ev.keyCode === ENTER_KEY) {
            if (title.trim()) {
                ev.preventDefault()
                const title1 = title.trim()
                title = ""
                this.dispatchEvent(
                    new CustomEvent("todo.create", {
                        bubbles: true,
                        detail: { title: title1 },
                    })
                )
            }
        }
    })

    while (true) {
        yield (
            <header class="header">
                <h1>todos</h1>
                <input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                    value={title}
                />
            </header>
        )
    }
}
