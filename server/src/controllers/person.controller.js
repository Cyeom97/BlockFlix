import responseHandler from '../handlers/response.handler.js'
import tmdbApi from '../tmdb/tmdb.api.js'

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params
    const person = await tmdbApi.personDetail({ personId })
    responseHandler.okRequest(res, person.data)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params
    const person = await tmdbApi.personMedias({ personId })
    responseHandler.okRequest(res, person.data)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

export default {
  personDetail,
  personMedias
}
