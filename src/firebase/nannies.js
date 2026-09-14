import {
  ref,
  get,
  query,
  limitToFirst,
  orderByKey,
  startAt,
} from 'firebase/database'

import { database } from './config'

export const getNannies = async (limit = 3, startIndex = 0) => {
  const nanniesRef = ref(database, 'nannies')

  const nanniesQuery = query(
    nanniesRef,
    orderByKey(),
    startAt(String(startIndex)),
    limitToFirst(limit)
  )

  const snapshot = await get(nanniesQuery)

  if (!snapshot.exists()) {
    return []
  }

  return Object.entries(snapshot.val()).map(([id, nanny]) => ({
    id,
    ...nanny,
  }))
}
