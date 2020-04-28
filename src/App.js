/** @jsx createElement */
import { createElement, Fragment } from "@bikeshaving/crank"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { Footer } from "./components/Footer"
import { getStorage, setStorage as save } from "./util"

export function* App() {
    let filter = ""
    let { todos, nextTodoId } = getStorage()

    this.addEventListener("todo.create", (ev) => {
        todos.push({
            id: nextTodoId++,
            title: ev.detail.title,
            completed: false,
        })
        this.refresh()
        save(todos)
    })

    this.addEventListener("todo.edit", (ev) => {
        const i = todos.findIndex((todo) => todo.id === ev.detail.id)
        todos[i].title = ev.detail.title
        this.refresh()
        save(todos)
    })

    this.addEventListener("todo.toggle", (ev) => {
        const i = todos.findIndex((todo) => todo.id === ev.detail.id)
        todos[i].completed = ev.detail.completed
        this.refresh()
        save(todos)
    })

    this.addEventListener("todo.toggleAll", (ev) => {
        todos = todos.map((todo) => ({
            ...todo,
            completed: ev.detail.completed,
        }))
        this.refresh()
        save(todos)
    })

    this.addEventListener("todo.clearCompleted", () => {
        todos = todos.filter((todo) => !todo.completed)
        this.refresh()
        save(todos)
    })

    this.addEventListener("todo.destroy", (ev) => {
        todos = todos.filter((todo) => todo.id !== ev.detail.id)
        this.refresh()
        save(todos)
    })

    const route = (ev) => {
        switch (window.location.hash) {
            case "#/active": {
                filter = "active"
                break
            }
            case "#/completed": {
                filter = "completed"
                break
            }
            case "#/": {
                filter = ""
                break
            }
            default: {
                filter = ""
                window.location.hash = "#/"
            }
        }

        if (ev != null) {
            this.refresh()
        }
    }

    route()
    window.addEventListener("hashchange", route)

    try {
        while (true) {
            yield (
                <Fragment>
                    <Header />
                    {!!todos.length && <Main todos={todos} filter={filter} />}
                    {!!todos.length && <Footer todos={todos} filter={filter} />}
                </Fragment>
            )
        }
    } finally {
        window.removeEventListener("hashchange", route)
    }
}
