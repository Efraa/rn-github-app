import { readonly } from 'src/helpers/readonly'
import { API } from './api-connection'
import { API_PER_PAGE } from '@env'
import { usersMapper } from './mappers'

/**
 * Domains or resources
 * @author Efraa
 */
const DOMAIN = readonly({
  users: '/users',
  repos: '/repos',
  commits: (username: string, repo: string, perPage: number) =>
    `/repos/${username}/${repo}/commits?per_page=${perPage}`,
})

/**
 * Get users
 * @param {number} perPage Default {API_PER_PAGE}
 * @param {number} since Last user ID delivered in the list above,
 * this only applies if you want to paginate your data.
 *
 * @returns {Promise<Array>} List of objects formatted by a custom mapper
 *
 * @author Efraa
 */
export const getUsers = async (
  perPage = Number(API_PER_PAGE),
  since?: number
) => {
  const collection = (
    await API.get(`${DOMAIN.users}?per_page=${perPage}&since=${since}`)
  ).data

  return usersMapper(collection)
}
