import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

function SearchInput({ getMovies }) {
  const debounceRequest = debounce((query) => {
    getMovies(query)
  }, 300)

  const onChange = (evt) => {
    debounceRequest(evt.target.value || 'return')
  }

  return <Input placeholder="Type to search..." onChange={(e) => onChange(e)} />
}

export default SearchInput
