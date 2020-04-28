/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"

export function Filters({ filter }) {
    return (
        <ul class="filters">
            <li>
                <a class={filter === "" ? "selected" : ""} href="#/">
                    All
                </a>
            </li>
            <li>
                <a
                    class={filter === "active" ? "selected" : ""}
                    href="#/active"
                >
                    Active
                </a>
            </li>
            <li>
                <a
                    class={filter === "completed" ? "selected" : ""}
                    href="#/completed"
                >
                    Completed
                </a>
            </li>
        </ul>
    )
}
