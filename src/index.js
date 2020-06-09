import './style.scss'

//Shortcuts 
const d = global.document
const q = (...args) => d.querySelector(...args)
const qa = (...args) => d.querySelectorAll(...args)
const cl = (...args) => console.log(...args)
const w = window

//Templates
const getTodoHtml = (args = {}) => {
    return `<li class="${args.color || 'white'} todo-item list-group-item d-flex w-100 mb-2 ${args.complited === true ? 'completed-li': ''}" data-id="${args.id || ''}">
    <div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${args.title || 'Title'}</h5>
            <div>
                <small class="mr-2">${args.priority || 'Middle'} priority</small>
                <small>${(args.date)?(args.date):(new Date().getHours()+':'+new Date().getMinutes()+' '+ new Date().toLocaleDateString())}</small>
            </div>

        </div>
        <p class="mb-1 w-100">${args.text || 'Still empty'}</p>
    </div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            ${args.complited !== true ? `<button type="button" class="btn btn-success w-100 compl-btn">Complete</button>` : ``}
            ${true !== true ? `<button type="button"  class="btn btn-info w-100 my-2">Edit</button>` : ``}
            <button type="button" class="btn btn-danger w-100 delete-btn">Delete</button>
        </div>
    </div>
</li>`
}

//Globals

let edit = false
let editId = ""

/* Render All Todos */
const renderTodos = () => {
    console.log(todos)
    if (todos.length > 0) {
        q('.todo-title').innerHTML = `
        ToDo<span style="color:darkred">(${todos.filter(el => el.complited !== true).length})</span>
        `
        q('.todo-comp-title').innerHTML = `
        Completed<span style="color:darkgreen">(${todos.filter(el => el.complited === true).length})</span>
        `
    }
    localStorage.setItem('todos', JSON.stringify(todos))
    q('#currentTasks').innerHTML = ''
    q('#completedTasks').innerHTML = ''
    todos.filter(v => v.complited !== true).forEach(todo => {
        q('#currentTasks').innerHTML += getTodoHtml({...todo})
    })
    todos.filter(v => v.complited === true).forEach(todo => {
        q('#completedTasks').innerHTML += getTodoHtml({...todo})
    })
    qa('.compl-btn').forEach(todo => {
        todo.onclick = function(){
            const id = this.parentNode.parentNode.parentNode.dataset.id
            todos.filter(todo => todo.id === id)[0].complited = true
            renderTodos()
        }
    })
    qa('.delete-btn').forEach(todo => {
        todo.onclick = function(){
            const id = this.parentNode.parentNode.parentNode.dataset.id
            todos = todos.filter(todo => todo.id !== id)
            renderTodos()
        }
    })
    qa('.todo-item.red').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8},50%,65%)`)
    qa('.todo-item.green').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8 + 120},50%,65%)`)
    qa('.todo-item.blue').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8 + 240},50%,65%)`)
}

let todos = (localStorage.todos == undefined) ? [
    /* 
    {
        title : String,
        priority : String,
        text : String,
        color : String,
        date : Date,
        complited : Boolean
    }
    */
] : JSON.parse(localStorage.todos)

/* Add Todo */
const addTodo = (e) => {
    const form = e.target
    e.preventDefault()
    todos.push({
        id: 'id'+new Date().getTime(),
        title: form.inputTitle.value,
        text: form.inputText.value,
        priority: form.gridRadios.value,
        date : new Date().getHours()+':'+new Date().getMinutes()+' '+ new Date().toLocaleDateString(),
        color: form.color.value,
        complited : false
    })
    form.reset()
    q('[data-dismiss="modal"]').click()
    renderTodos()
}
/* Edit Todo */
const editTodo = (e) => {
    const form = e.target
    e.preventDefault()
    todos.push({
        id: 'id'+new Date().getTime(),
        title: form.inputTitle.value,
        text: form.inputText.value,
        priority: form.gridRadios.value,
        date : new Date().getHours()+':'+new Date().getMinutes()+' '+ new Date().toLocaleDateString(),
        color: form.color.value,
        complited : false
    })
    form.reset()
    edit = false
    q('[data-dismiss="modal"]').click()
    renderTodos()
}
//Scripts
window.onload = () => {
    //Presets 
    if (localStorage.todos != undefined) renderTodos()
    if (localStorage.color != undefined) {
        q('body').style.filter = `hue-rotate(${Number(localStorage.color) * 1.8 }deg)`
        q('#colorRange').value = localStorage.color
        qa('.todo-item.red').forEach(item => item.style.backgroundColor = `hsl(${Number(localStorage.color) * -1.8},50%,65%)`)
        qa('.todo-item.green').forEach(item => item.style.backgroundColor = `hsl(${Number(localStorage.color) * -1.8 + 120},50%,65%)`)
        qa('.todo-item.blue').forEach(item => item.style.backgroundColor = `hsl(${Number(localStorage.color) * -1.8 + 240},50%,65%)`)
        // qa('.todo-item').forEach(item => item.style.filter = `hue-rotate(${Number(localStorage.color) * 1.8 * -1 }deg)`)
    }

    //Events
    q('form').onsubmit = function() {
        if (edit === true) editTodo(event)
        if (edit !== true) addTodo(event)
    }
    function changeRange() {
        q('body').style.filter = `hue-rotate(${event.target.value * 1.8 }deg)`
        cl(`hsl(${event.target.value * -1.8},50%,65%)`)
        qa('.todo-item.red').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8},50%,65%)`)
        qa('.todo-item.green').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8 + 120},50%,65%)`)
        qa('.todo-item.blue').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8 + 240},50%,65%)`)
        localStorage.setItem('color', event.target.value)
    }
    q('#colorRange').onchange = changeRange
    q('#colorRange').oninput = changeRange
}