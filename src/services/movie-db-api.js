export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=3d5fcff070bf109ad631bfb2abbd8e6e'

  async getResource(url, query) {
    const res = await fetch(`${this._apiBase}${url}?${this._apiKey}&${query}`)

    if (!res.ok) {
      throw new Error(`Could not fetch , received ${res.status}`)
    }

    return await res.json()
  }

  getMovies(query, page) {
    return this.getResource('/search/movie', `query=${query}&page=${page}`)
  }

  async createGuestSession() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new?${this._apiKey}`)

    if (!res.ok) {
      throw new Error('Cannot create new guest session')
    }

    const data = await res.json()
    return data.guest_session_id
  }

  async getRatedMovies(page) {
    const id = sessionStorage.getItem('guestId')
    const res = await fetch(`${this._apiBase}/guest_session/${id}/rated/movies?${this._apiKey}&page=${page}`)
    return await res.json()
  }

  async rateMovie(id, value, guestId) {
    await fetch(`${this._apiBase}/movie/${id}/rating?${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'POST',
      body: JSON.stringify({
        value: value,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  async getGenres() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?${this._apiKey}`)

    return await res.json()
  }
}
