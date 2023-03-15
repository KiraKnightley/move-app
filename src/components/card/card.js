import React, { Component } from 'react'
import { Typography, Rate } from 'antd'
import format from 'date-fns/format'

import MovieApi from '../../services/movie-db-api'
import { MovieApiConsumer } from '../movie-db-api-context'

import './card.css'

export default class Card extends Component {
  movieApi = new MovieApi()

  truncate(str, num) {
    if (str.length <= num) return str
    const substring = str.substr(0, num - 1)
    return substring.substr(0, substring.lastIndexOf(' ')) + '...'
  }

  formatDate(date) {
    if (!date) {
      return 'Release date unknown'
    }
    return format(new Date(date), 'MMMM d, y')
  }

  renderImage(path) {
    const _urlBase = 'https://image.tmdb.org/t/p/original'

    if (!path) {
      return <div className="card-image-absent" />
    }
    return <img src={_urlBase + path} className="card-image" />
  }

  averageColor = (avg) => {
    if (avg >= 0 && avg <= 3) return '#E90000'
    else if (avg > 5 && avg <= 5) return '#E97E00'
    else if (avg > 5 && avg <= 7) return '#E9D100'
    else return '#66E900'
  }

  render() {
    const { name, title, overview, release_date, poster_path, id, vote_average, genre_ids } = this.props.data
    const { rateMovie, rated } = this.props
    const { Text } = Typography
    const image = this.renderImage(poster_path)

    let truncLength = 160
    if (title.length > 35) {
      truncLength = 90
    } else if (title.length > 20) {
      truncLength = 120
    }
    if (genre_ids.length > 3) {
      truncLength -= 20
    }

    return (
      <li className="card">
        {image}
        <div className="card-content">
          <div className="card-header">
            <div className="card-title-area">
              <h3 className="card-title">{name || title}</h3>
              <div className="card-average" style={{ border: `2px solid ${this.averageColor(vote_average)}` }}>
                <span>{vote_average.toFixed(1)}</span>
              </div>
            </div>
            <Text className="card-date" type="secondary">
              {this.formatDate(release_date)}
            </Text>
            <div className="card-genres">
              <MovieApiConsumer>
                {(genres) => {
                  return genres
                    .filter((el) => {
                      return genre_ids.includes(el.id)
                    })
                    .map((el) => {
                      // console.log(el)
                      return (
                        <span key={el.id} className="genre">
                          {el.name}
                        </span>
                      )
                    })
                }}
              </MovieApiConsumer>
            </div>
          </div>
          <div className="card-description">
            <Text>{this.truncate(overview, truncLength)}</Text>
            <Rate
              count={10}
              value={rated[id] || 0}
              allowHalf
              onChange={(e) => {
                rateMovie(id, e)
              }}
            />
          </div>
        </div>
      </li>
    )
  }
}
