<template>
  <div class="todo" :class="{ 'todo--completed': todo.completed }">
    <div v-if="!edit" class="todo__wrapper">
      <input 
      type="checkbox" 
      class="todo__checkbox" 
      :value="todo.completed" 
      @change="handleCheckbox" 
      :checked="todo.completed"
      :id="todo._id">
      <label :for="todo._id" class="todo__label"></label>
      <h4 class="todo__title" @dblclick="editMode">{{ todo.title }}</h4>
      <button @click="deleteTodo" class="todo__delete"></button>
    </div>
    <div v-else class="todo__edit">
      <form @submit.enter.prevent="editTodo" class="todo__edit-form" @keydown.esc="edit = false">
        <input type="text" :value="todo.title" @change="handleChange" class="todo__edit-form-input">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      edit: false,
      newTodoTitle: ''
    }
  },
  props: {
    todo: {
      type: Object
    }
  },
  methods: {
    deleteTodo() {
      this.$emit('deleteTodo', this.todo._id)
    },
    handleCheckbox() {
      this.$emit('handleCheckbox', { id: this.todo._id, completed: !this.todo.completed, title: this.todo.title })
    },
    handleChange(e) {
      this.newTodoTitle = e.target.value
    },
    editMode() {
      this.edit = true
    },
    editTodo() {
      if(this.newTodoTitle.trim()) {
        this.$emit('editTodo', { id: this.todo._id, title: this.newTodoTitle })
        this.edit = false
      }
    }
  }
}
</script>

<style lang="scss">
.todo {
  $root: &;

  border-bottom: 1px solid #ededed;
  background-color: #fff;

  &__wrapper {
    display: flex;
    align-items: center;
    padding: 1rem;
    position: relative;
  }

  &__title {
    margin: 0;
    width: 100%;
    text-align: left;
  }

  &__checkbox {
    display: none;

    &:checked {
      & ~ #{$root}__label {
        &:before,
        &:after {
          opacity: 1;
        }
      }
    }
  }

  &__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border: 1px solid #ededed;
    border-radius: 50%;
    margin-right: 1rem;
    position: relative;
    flex: 0 0 3rem;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      height: .2rem;
      background-color: #5DC2AF;
      opacity: 0;
      transition: opacity .3s ease-in-out;
    }

    &:before {
      transform: rotate(45deg) translate(-.2rem, 0.4rem);
      width: .8rem;
    }

    &:after {
      transform: rotate(-55deg) translate(0.2rem, 0.2rem);
      width: 1.5rem;
    }
  }

  &--completed {
    #{$root} {
      &__title {
        text-decoration: line-through;
      }
    }
  }

  &__delete {
    position: relative;
    margin-left: auto;
    width: 4rem;
    height: 4rem;
    border: none;
    background: none;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    
    &:before,
    &:after {
      content: '';
      width: 1rem;
      height: .2rem;
      background-color: red;
      position: absolute;
      left: calc(50% - .5rem);
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }

  &__edit {
    padding: 1rem;

    &-form {
      display: flex;

      &-input {
        padding: 1rem 1.6rem .9rem 1rem;
        width: 100%;
        margin-left: 4rem;
        flex: 1;
      }
    }
  }

  &:hover {
    #{$root}__delete {
      opacity: 1;
    }
  }
}
</style>