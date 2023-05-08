import response from '../handlers/response.js'
import tmdbApi from '../tmdb/tmdb.api.js'

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params
    const person = await tmdbApi.personDetail({ personId })
    response.okRequest(res, person.data)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params
    const person = await tmdbApi.personMedias({ personId })
    response.okRequest(res, person.data)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

export default {
  personDetail,
  personMedias
}
