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
            ${args.complited !== true ? `<button type="button"  class="btn btn-info w-100 my-2 edit-btn">Edit</button>` : ``}
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
    q('.todo-title').innerHTML = `
    ToDo<span style="color:darkred">(${todos.filter(el => el.complited !== true).length})</span>
    `
    q('.todo-comp-title').innerHTML = `
    Completed<span style="color:darkgreen">(${todos.filter(el => el.complited === true).length})</span>
    `
    localStorage.setItem('todos', JSON.stringify(todos))
    q('#currentTasks').innerHTML = ''
    q('#completedTasks').innerHTML = ''
    /* Sorter */
    let todosiq = todos.map(v=>v)
    if (global.sorter !== undefined) {
        todosiq.sort((a,b)=>(a.seconds-b.seconds)*global.sorter)
    }
    //Draw template
    todosiq.filter(v => v.complited !== true).forEach(todo => {
        q('#currentTasks').innerHTML += getTodoHtml({...todo})
    })
    todosiq.filter(v => v.complited === true).forEach(todo => {
        q('#completedTasks').innerHTML += getTodoHtml({...todo})
    })
    //No todos content
    if (todos.length === 0) q('#currentTasks').innerHTML += `<h2><i style="color: red">There are no todos</i></h2>`
    //Todos controll
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
    /* Edit btn. Transform add-todos to edit-todos modal frame */
    qa('.edit-btn').forEach(todo => {
        todo.onclick = function(){
            edit = true
            qa('.edit-show').forEach(el => el.style.display = 'none')
            qa('.edit-hide').forEach(el => el.style.display = 'inline-block')
            q('.addTaskBtn').click()
            editId = this.parentNode.parentNode.parentNode.dataset.id
            const form = q('form')
            const id = editId
            let index
            todos.forEach((v,i) => {
                if (v.id === id) index=i
            })
            form.inputTitle.value = todos[index].title || 'Title'
            form.inputText.value = todos[index].text || 'Put something'
            form.gridRadios.value = todos[index].priority
            form.color.value = todos[index].color
        }
    })
    /* Filter fixer for todos with definite color */
    qa('.todo-item.red').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8},50%,65%)`)
    qa('.todo-item.green').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8 + 120},50%,65%)`)
    qa('.todo-item.blue').forEach(item => item.style.backgroundColor = `hsl(${q('#colorRange').value * -1.8 + 240},50%,65%)`)
}

//Load Todos from localStorage
let todos = (localStorage.todos == undefined) ? [
    /* 
    {
        title : String,
        priority : String,
        text : String,
        color : String,
        date : String,
        complited : Boolean
        seconds : Number
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
        complited : false,
        seconds: new Date().getTime()
    })
    form.reset()
    q('[data-dismiss="modal"]').click()
    renderTodos()
}
/* Edit Todo */
const editTodo = (e) => {
    const form = e.target
    const id = editId
    let index
    todos.forEach((v,i) => {
        if (v.id === id) index=i
    })
    e.preventDefault()
    q('[data-dismiss="modal"]').click()
    todos[index].title = form.inputTitle.value
    todos[index].text = form.inputText.value
    todos[index].color = form.color.value
    todos[index].priority = form.gridRadios.value
    edit = false
    form.reset()
    renderTodos()
}
/* Save JSON */
function downloadObjectAsJson(exportObj){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "mytodos.json");
    document.body.appendChild(downloadAnchorNode); // firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
//Scripts
window.onload = () => {
    //Presets 
    if (localStorage.sorter != undefined) global.sorter = Number(localStorage.sorter)
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
        /* Edit | Add todo switcher */
    q('.addTaskBtn').onmouseenter = () => {
        edit = false
        q('form').reset()
        qa('.edit-show').forEach(el => el.style.display = 'inline-block')
        qa('.edit-hide').forEach(el => el.style.display = 'none')
    }
    /* Edit | Add todo submiter */
    q('form').onsubmit = function() {
        if (edit === true) {
            editTodo(event)
        } else {
            addTodo(event)
        }
    }
    /* Color theme handler */
    function changeRange() {
        q('body').style.filter = `hue-rotate(${event.target.value * 1.8 }deg)`
        qa('.todo-item.red').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8},50%,65%)`)
        qa('.todo-item.green').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8 + 120},50%,65%)`)
        qa('.todo-item.blue').forEach(item => item.style.backgroundColor = `hsl(${event.target.value * -1.8 + 240},50%,65%)`)
        localStorage.setItem('color', event.target.value)
    }
    q('#colorRange').onchange = changeRange
    q('#colorRange').oninput = changeRange
    /* Sorter event */
    q('.directTodo').onclick = () => {
        global.sorter = -1
        localStorage.setItem('sorter', -1)
        renderTodos()
    }
    q('.reverseTodo').onclick = () => {
        global.sorter = 1
        localStorage.setItem('sorter', 1)
        renderTodos()
    }
    /* Save todos to JSON file*/
    q('.setbtn.save').onclick = () => {
        downloadObjectAsJson(todos)
    }
    /* Load todos from JSON file*/
    q('.setbtn.load').onchange = function(){
        const file = this.files[0]
        const fr = new FileReader()
        fr.addEventListener("load", e => {
            q('#dropdownMenuSettings').click()
            todos = JSON.parse(fr.result)
            renderTodos()
        });
        fr.readAsText(file)
    }
}