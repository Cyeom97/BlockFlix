const responseData = (res, statusCode, data) => {
  res.status(statusCode).json(data)
}

const error = (res) =>
  responseData(res, 500, {
    status: 500,
    message: 'Sorry! There seems to be an error!'
  })

const badRequest = (res) =>
  responseData(res, 400, {
    status: 400,
    message: 'Bad Request'
  })

const okRequest = (res, data) =>
  responseData(res, 200, {
    status: 200,
    data
  })

const createdRequest = (res, data) =>
  responseData(res, 201, {
    status: 201,
    data
  })

const unauthorizedRequest = (res) =>
  responseData(res, 401, {
    status: 401,
    message: 'Unauthorized'
  })

const notFoundRequest = (res) =>
  responseData(res, 404, {
    status: 404,
    message: 'Sorry! The resource you are looking for is not found!'
  })

export default {
  error,
  badRequest,
  okRequest,
  createdRequest,
  unauthorizedRequest,
  notFoundRequest
}
