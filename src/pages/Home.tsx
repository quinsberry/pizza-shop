import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'

import { Categories, SortPopup } from '../components/common'
import { PizzaBlock } from '../components'

import { pizzasSorting, pizzasCategories } from '../consts/filters'

import { getPizzas } from '../redux/reducers/pizzas'
import { actions } from '../redux/reducers/filters'

import { TPizza, TAppState } from '../types/types'

type TMapState = {
  pizzas: Array<TPizza> | undefined
  isLoading: boolean
  isLoaded: boolean
  sortBy: string
  category: string | null
}

const Home: React.FC = () => {
  const { setSortBy, setCategory } = actions
  const dispatch = useDispatch()

  const { pizzas, isLoading, sortBy, category } = useSelector<TAppState, TMapState>((state) => ({
    pizzas: state.pizzas.items,
    isLoading: state.pizzas.isLoading,
    isLoaded: state.pizzas.isLoaded,
    sortBy: state.filters.sortBy,
    category: state.filters.category,
  }))

  React.useEffect(() => {
    dispatch(getPizzas(category, sortBy))
  }, [category, sortBy])

  const handleAction = {
    setSort: React.useCallback((type: string) => {
      dispatch(setSortBy(type))
    }, []),
    setCategory: React.useCallback((type: string | null) => {
      dispatch(setCategory(type))
    }, []),
  }

  return (
    <div className="container">
      <Helmet>
        <meta name="description" content="List with pizzas for order" />
      </Helmet>

      <div className="content__top">
        <Categories
          items={pizzasCategories}
          category={category}
          setCategory={handleAction.setCategory}
        />
        <SortPopup items={pizzasSorting} sortBy={sortBy} setSortBy={handleAction.setSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {pizzas?.map((pizza) => {
          return <PizzaBlock key={pizza._id} isLoading={isLoading} pizza={pizza} />
        })}
      </div>
    </div>
  )
}

export default Home
