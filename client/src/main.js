import Vue from 'vue'
import App from './App.vue'
import ApolloClient from "apollo-boost"
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo)

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
})

const apolloProvider = new VueApollo({
  defaultClient: client,
})

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
