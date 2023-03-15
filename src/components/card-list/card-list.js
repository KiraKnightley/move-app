import React, { Component } from 'react'
import { Alert, Spin } from 'antd'

import Card from '../card'
import './card-list.css'

export default class CardList extends Component {
  componentDidMount() {
    const { getMovies } = this.props
    getMovies()
  }

  render() {
    const { movies, error, loading, rateMovie, rated } = this.props
    const items = movies.map((el) => {
      return <Card key={el.id} data={el} rateMovie={rateMovie} rated={rated} />
    })

    const list = loading || error || movies.length < 1 ? null : <ul className="card-list">{items}</ul>
    const errorAlert = error ? (
      <Alert
        className="offline-error"
        message="Ошибка!"
        description="Во время запроса произошла ошибка."
        type="error"
        showIcon
      />
    ) : null
    const loader = loading ? <Spin className="loader" size="large" /> : null
    const notFound =
      !loading && !error && movies.length == 0 ? (
        <Alert message="По вашему запросу ничего не найдено" type="info" className="notfound-alert" />
      ) : null

    return (
      <React.Fragment>
        {loader}
        {list}
        {errorAlert}
        {notFound}
      </React.Fragment>
    )
  }
}
