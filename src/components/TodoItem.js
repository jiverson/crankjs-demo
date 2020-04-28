/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { ENTER_KEY, ESC_KEY } from "../util"

export function* TodoItem({ todo }) {
    let active = false
    let title = todo.title

    this.addEventListener("click", (ev) => {
        if (ev.target.className === "toggle") {
            this.dispatchEvent(
                new CustomEvent("todo.toggle", {
                    bubbles: true,
                    detail: { id: todo.id, completed: !todo.completed },
                })
            )
        }

        if (ev.target.className === "destroy") {
            this.dispatchEvent(
                new CustomEvent("todo.destroy", {
                    bubbles: true,
                    detail: { id: todo.id },
                })
            )
        }
    })

    this.addEventListener("dblclick", (ev) => {
        if (ev.target.tagName === "LABEL") {
            active = true
            this.refresh()
            ev.target.parentElement.nextSibling.focus()
        }
    })

    this.addEventListener("input", (ev) => {
        if (ev.target.className === "edit") {
            title = ev.target.value
        }
    })

    this.addEventListener("keydown", (ev) => {
        if (
            ev.target.className === "edit" &&
            [ENTER_KEY, ESC_KEY].includes(ev.keyCode)
        ) {
            active = false
            title = title.trim()

            if (title) {
                this.dispatchEvent(
                    new CustomEvent("todo.edit", {
                        bubbles: true,
                        detail: { id: todo.id, title },
                    })
                )
                return
            }

            this.dispatchEvent(
                new CustomEvent("todo.destroy", {
                    bubbles: true,
                    detail: { id: todo.id },
                })
            )
        }
    })

    this.addEventListener(
        "blur",
        (ev) => {
            if (ev.target.className === "edit") {
                active = false
                if (title) {
                    this.dispatchEvent(
                        new CustomEvent("todo.edit", {
                            bubbles: true,
                            detail: { id: todo.id, title },
                        })
                    )
                    return
                }

                this.dispatchEvent(
                    new CustomEvent("todo.destroy", {
                        bubbles: true,
                        detail: { id: todo.id },
                    })
                )
            }
        },
        { capture: true }
    )

    for ({ todo } of this) {
        const classes = []

        if (active) {
            classes.push("editing")
        }

        if (todo.completed) {
            classes.push("completed")
        }

        yield (
            <li class={classes.join(" ")}>
                <div class="view">
                    <input
                        class="toggle"
                        type="checkbox"
                        checked={todo.completed}
                    />
                    <label>{todo.title}</label>
                    <button class="destroy" />
                </div>
                <input class="edit" value={title} />
            </li>
        )
    }
}
