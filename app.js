const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.form-search input')


const addTodo = (value) => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const icon = document.createElement('i')
    li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center')
    icon.setAttribute('class','far fa-trash-alt delete')
    span.textContent = `${value}`
    todosContainer.append(li)
    li.append(span,icon)
}

// adicionar to do
formAddTodo.addEventListener('submit',event => {
    event.preventDefault()
    
    const inputValue = event.target.add.value.trim()
    
    if (inputValue.length){
        addTodo(inputValue)
    }
    event.target.reset()
})


// remover to do
const removeTodo = clickedElement => {
    const clickedElementDelete = Array.from(clickedElement.classList).includes('delete')

    if (clickedElementDelete){
        clickedElement.parentElement.remove()
    }
}

todosContainer.addEventListener('click',event => {
    const clickedElement = event.target
    removeTodo(clickedElement)
})


// pesquisar to do 

const filterTodos = (todos,inputValue,returnFilter) => 
    todos.filter(todo => {
        const matchedTodos = todo.textContent.toLocaleLowerCase().includes(inputValue)
        return returnFilter ? matchedTodos : !matchedTodos

    })


const hideTodos = (todos,inputValue) => {
    filterTodos(todos,inputValue,false)
    .forEach(todo => {
        todo.classList.add('d-none')
        todo.classList.remove('d-flex')
    })
}

const showTodos = (todos,inputValue) => {
    filterTodos(todos,inputValue,true)
    .forEach(todo => {
        todo.classList.add('d-flex')
        todo.classList.remove('d-none')
    })
}

inputSearchTodo.addEventListener('input',event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children)
   
    hideTodos(todos,inputValue)
    showTodos(todos,inputValue)
    
})
