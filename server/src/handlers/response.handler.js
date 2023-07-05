const responseData = (res, statusCode, data) => {
  res.status(statusCode).json(data)
}

const error = (res) =>
  responseData(res, 500, {
    status: 500,
    message: 'Sorry! There seems to be an error!'
  })

const badRequest = (res, message) =>
  responseData(res, 400, {
    status: 400,
    message
  })

const okRequest = (res, data) => responseData(res, 200, data)

const createdRequest = (res, data) => responseData(res, 201, data)

const unauthorizedRequest = (res) =>
  responseData(res, 401, {
    status: 401,
    message: 'Unathorized'
  })

const notFoundRequest = (res) =>
  responseData(res, 404, {
    status: 404,
    message: 'Resource not found'
  })

export default {
  error,
  badRequest,
  okRequest,
  createdRequest,
  unauthorizedRequest,
  notFoundRequest
}
