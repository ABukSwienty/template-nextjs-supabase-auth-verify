/**
 * Type guard for validating the body of a request. Does NOT check the actual validity of the data.
 * @example
 * type RequestBody = {
 *  id: string
 * }
 *
 * function handler(req, res) {
 *  if (!isValidBody<RequestBody>(req.body, ['id'])) {
 *      return res.status(402)
 *  }
 * // req.body.id - is expected to be a string down the road
 * }
 *
 * @link https://stackoverflow.com/questions/69893369/how-to-add-typescript-types-to-request-body-in-next-js-api-route/70788003#70788003
 * @param body Object
 * @param fields Array of keys
 * @returns boolean
 */
function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}

export default isValidBody;
