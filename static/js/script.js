const SELECTORS = {
    todoWrapper: '.todo__content',
    getTodo: '#getTodo',
    postTodo: '#postTodo',
    todoItemWrapper: '.todo__wrapper',
    todoText: '.todo__text--title',
    emptyMessage: '.todo__text--subtitle'
}

const todoWrapper = document.querySelector(SELECTORS.todoWrapper)
const getTodo = document.getElementById('getTodo')
const postTodo = document.getElementById('postTodo')

window.addEventListener('DOMContentLoaded', loadTodos)
getTodo.addEventListener('keydown', handleEnterKey)
postTodo.addEventListener('click', handleAddTodo)
todoWrapper.addEventListener('click', handleRemoveTodo)

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        postTodo.click()
    }
}

function handleAddTodo() {
    const todoText = getTodo.value.trim()

    if (!todoText) {
        alert('The field cannot be empty')
        return
    }

    const createTodoWrapper = createTodoItem(todoText)
    todoWrapper.append(createTodoWrapper)

    getTodo.value = ''

    saveTodos()

    checkEmptyTodo()
}

function createTodoItem(todoText) {
    const createTodoWrapper = document.createElement('div')
    createTodoWrapper.classList.add('todo__wrapper')

    const createTodo = document.createElement('span')
    createTodo.textContent = todoText
    createTodo.classList.add('todo__item', 'todo__text', 'todo__text--title')

    const createTodoBtn = document.createElement('button')
    createTodoBtn.textContent = 'Remove'
    createTodoBtn.classList.add('todo__item-btn')

    createTodoWrapper.append(createTodo, createTodoBtn)

    return createTodoWrapper
}

function handleRemoveTodo(event) {
    if (event.target.classList.contains('todo__item-btn')) {
        const todoItem = event.target.closest(SELECTORS.todoItemWrapper)
        todoItem.remove()
        saveTodos()
        checkEmptyTodo()
    }
}

function checkEmptyTodo() {
    const todoItems = todoWrapper.querySelectorAll(SELECTORS.todoItemWrapper)
    const emptyTodoCheck = todoWrapper.querySelector(SELECTORS.emptyMessage)

    if (todoItems.length === 0 && !emptyTodoCheck) {
        const noTasksMessage = document.createElement('span')
        noTasksMessage.classList.add('todo__text', 'todo__text--subtitle', 'margin')
        noTasksMessage.textContent = "You haven't added any goals yet"
        todoWrapper.append(noTasksMessage)
    } else if (todoItems.length > 0 && emptyTodoCheck) {
        emptyTodoCheck.remove()
    }
}

function saveTodos() {
    const todoItems = todoWrapper.querySelectorAll(SELECTORS.todoItemWrapper)
    const todos = Array.from(todoItems).map(item => {
        return item.querySelector('.todo__text--title').textContent
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos() {
    try {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || []

        if (savedTodos.length > 0) {
            savedTodos.forEach(todo => {
                const createTodoWrapper = createTodoItem(todo)
                todoWrapper.append(createTodoWrapper)
            })
        }

        checkEmptyTodo()
    } catch (error) {
        console.error("Error loading todos from localStorage", error)
    }
}