const Todo = require('../models/Todo')
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
 } = require('graphql')

const TodoType = new GraphQLObjectType({
  name: 'TodoType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
})

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find({})
      }
    },
    todo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Todo.findById(args.id)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { title }) {
        return Todo.create({ title, completed: false })
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, { id }) {
        return Todo.findOneAndDelete({ _id: id })
      }
    },
    editTodoCompletion: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        completed: { type: GraphQLBoolean }
      },
      resolve(parent, { id, completed }) {
        return Todo.findByIdAndUpdate(id, {
          $set: {
            completed
          }
        })
      }
    },
    editTodoTitle: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString }
      },
      resolve(parent, { id, title }) {
        console.log(id, title)
        return Todo.findByIdAndUpdate(id, {
          $set: {
            title
          }
        })
      }
    },
    clearCompleted: {
      type: TodoType,
      resolve(parent, args) {
        return Todo.deleteMany({ completed: { $eq: true }  })
      }
    },
    markCompleted: {
      type: TodoType,
      args: {
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, { completed }) {
        return Todo.updateMany({ completed: !completed }, {
          $set: {
            completed: completed
          }
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query,
  mutation
})