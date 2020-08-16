<template>
  <div id="app">
    <header class="header">
      <h1 class="header__title">todos</h1>
    </header>
    <main class="main">
      <header class="header__form">
        <button @click="markAllComplete" class="mark-as-completed__button"></button>
        <form @submit.enter.prevent="addTodo" class="form">
          <input type="text" v-model="todo" placeholder="What needs to be done?" class="form__input">
        </form>
      </header>
      
      <section class="todos">
        <Todo 
          v-for="todo in filteredTodos" 
          :key="todo.id" 
          :todo="todo" 
          @deleteTodo="deleteTodo" 
          @handleCheckbox="handleCheckbox"
          @editTodo="editTodo" />
      </section>

      <section class="actions" v-if="todos.length > 0">
        <span>{{ activeItemsCount }} items left</span>
        <div>
          <button @click="show = 'all'" class="actions__button" :class="{ 'active': show === 'all' }">All</button>
          <button @click="show = 'active'" class="actions__button" :class="{ 'active': show === 'active' }">Active</button>
          <button @click="show = 'completed'" class="actions__button" :class="{ 'active': show === 'completed' }">Completed</button>
        </div>
        <button @click="clearCompleted" class="actions__clear">Clear completed</button>
      </section>
    </main>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import Todo from './components/Todo'

export default {
  name: 'App',
  components: {
    Todo
  },
  data() {
    return {
      todos: [],
      todo: '',
      show: 'all'
    }
  },
  computed: {
    filteredTodos() {
      if(this.show === 'all') {
        return this.todos
      } else if(this.show === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else {
        return this.todos.filter(todo => todo.completed)
      }
    },
    activeItemsCount() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    getFromLocalStorage() {
      return JSON.parse(localStorage.getItem('todos'))
    },
    setInLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    addTodo() {
      const newTodo = {
        id: uuidv4(),
        title: this.todo,
        completed: false
      }

      this.todos = [...this.todos, newTodo]
      
      this.setInLocalStorage()

      this.clearInput()
    },
    clearInput() {
      this.todo = ''
    },
    deleteTodo(id) {
      const newTodos = this.todos.filter(todo => todo.id !== id)

      this.updateTodos(newTodos)
    },
    handleCheckbox({ id, completed }) {
      const newTodos = this.todos.map(todo => todo.id === id ? {...todo, completed} : todo)

      this.updateTodos(newTodos)
    },
    markAllComplete() {
      const notCompletedTodosCount = this.todos.filter(todo => !todo.completed).length

      if(notCompletedTodosCount) {
        const newTodos = this.todos.map(todo => ({ ...todo, completed: true }))
        this.updateTodos(newTodos)
      } else {
        const newTodos = this.todos.map(todo => ({ ...todo, completed: false }))
        this.updateTodos(newTodos)
      }
    },
    clearCompleted() {
      const newTodos = this.todos.filter(todo => !todo.completed)
      
      this.updateTodos(newTodos)
    },
    editTodo({ id, newTitle }) {
      const newTodos = this.todos.map(todo => todo.id === id ? {...todo, title: newTitle} : todo)

      this.updateTodos(newTodos)
    },
    updateTodos(arr) {
      this.todos = arr
      this.setInLocalStorage()
    }
  },
  mounted() {
    this.todos = this.getFromLocalStorage() || []
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  background-color: #f5f5f5;
}

button {
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  &__title {
    font-size: 10rem;
    color: rgba(175, 47, 47, 0.15);
    margin: 0;
  }

  &__form {
    position: relative;
  }
}

.main {
  max-width: 55rem;
  margin: auto;
}

.form {
  &__input {
    width: 100%;
    padding: 1.6rem 1.6rem 1.6rem 6rem;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    border: none;
    font-size: 2.4rem;

    &::placeholder {
      color: #E6E6E6;
      font-style: italic;
    }

    &:focus {
      outline: none;
    }
  }
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  &__button {
    border: 1px solid transparent;
    border-radius: 3px;
    background: none;
    padding: .3rem .7rem;
    margin: .3rem;
    
    &.active {
      border-color: rgba(175, 47, 47, 0.2);
    }
  }

  &__clear {
    border: none;
    background: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom .3s ease-in-out;

    &:hover {
      border-bottom-color: #000;
    }
  }
}

.mark-as-completed__button {
  position: absolute;
  width: 4rem;
  height: 4rem;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 1.5rem;
    height: .5rem;
    background-color: #e6e6e6;
  }

  &:before {
    transform: rotate(45deg) translate(-.3rem, .3rem);
  }

  &:after {
    transform: rotate(-45deg)  translate(.3rem, .3rem);
  }
}
</style>
