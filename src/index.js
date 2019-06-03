import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, createClient, subscriptionExchange, fetchExchange } from 'urql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const subscriptionClient = new SubscriptionClient(
  'ws://hasura-test-nicolas.herokuapp.com/v1/graphql',
  {
    reconnect: true
  }
)

const client = createClient({
  url: 'https://hasura-test-nicolas.herokuapp.com/v1/graphql',
  exchanges: [
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
})

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register()
