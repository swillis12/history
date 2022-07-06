import warning from 'warning'
import valueEqual from 'value-equal'
import { parsePath } from './PathUtils'
import { POP } from './Actions'

export const createQuery = (props) =>
  Object.assign(Object.create(null), props)

export const createLocation = (input = '/', action = POP, key = null) => {
  const object = typeof input === 'string' ? parsePath(input) : input

  warning(
    !object.path,
    'Location descriptor objects should have a `pathname`, not a `path`.'
  )

  const pathname = object.pathname || '/'
  const search = object.search || ''
  const hash = object.hash || ''
  const state = object.state

  return {
    pathname,
    search,
    hash,
    state,
    action,
    key
  }
}

export const locationsAreEqual = (a, b) =>
  a.key === b.key &&
  // a.action === b.action && // Different action !== location change.
  a.pathname === b.pathname &&
  a.search === b.search &&
  a.hash === b.hash &&
  valueEqual(a.state, b.state)
