import request from '../utils/request'

export const loginUser = async (data) => {
  const res = await request({
    url: '/users/login',
    method: 'POST',
    data
  })
  return res
}
