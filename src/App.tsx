import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Header } from './components'
import { Home, Cart, Error } from './pages'

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Helmet defaultTitle="Pizza Shop" titleTemplate="%s | Pizza Shop">
        <meta
          name="description"
          content="The place where you can order the best pizzas in the world"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <div className="content">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} />
          <Route path="/404" component={Error} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  )
}

export default App
