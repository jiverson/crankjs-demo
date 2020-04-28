/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import "regenerator-runtime/runtime"
import "todomvc-common/base.css"
import "todomvc-app-css/index.css"

import { App } from "./App"

renderer.render(<App />, document.getElementById("todoapp"))
