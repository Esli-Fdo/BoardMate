// LocalStorage persistent data manager for Module 2
// Manages Property Comparison, Saved Searches & Alerts, Recently Viewed, and Favourites

const STORAGE_KEYS = {
  COMPARE: 'boardmate_compare_ids',
  SAVED_SEARCHES: 'boardmate_saved_searches',
  RECENTLY_VIEWED: 'boardmate_recently_viewed',
  FAVORITES: 'boardmate_favorite_ids',
}

// Default initial seed data
const DEFAULT_COMPARE = ['prop-1', 'prop-2']

const DEFAULT_SAVED_SEARCHES = [
  {
    id: 'ss-1',
    name: 'Moratuwa Single Rooms under 15k',
    university: 'University of Moratuwa (UoM)',
    location: 'Katubedda, Moratuwa',
    minRent: 5000,
    maxRent: 15000,
    roomType: 'Single Room',
    gender: 'Any Gender',
    distance: '2',
    moveInDate: '2025-05-01',
    facilities: ['Free Wi-Fi', 'Attached Bathroom'],
    dateSaved: '2025-04-20',
    alertsEnabled: true,
    newMatchesCount: 4,
  },
  {
    id: 'ss-2',
    name: 'Katubedda Walking Distance (< 1km)',
    university: 'University of Moratuwa (UoM)',
    location: 'Katubedda',
    minRent: 8000,
    maxRent: 20000,
    roomType: 'All Room Types',
    gender: 'Any Gender',
    distance: '1',
    moveInDate: '2025-05-15',
    facilities: ['Free Wi-Fi', 'Study Desk'],
    dateSaved: '2025-04-22',
    alertsEnabled: true,
    newMatchesCount: 2,
  },
  {
    id: 'ss-3',
    name: 'Budget Shared Accommodation',
    university: 'University of Moratuwa (UoM)',
    location: 'Moratuwa',
    minRent: 5000,
    maxRent: 10000,
    roomType: 'Shared Room',
    gender: 'Any Gender',
    distance: '5',
    moveInDate: '',
    facilities: ['Laundry Machine'],
    dateSaved: '2025-04-25',
    alertsEnabled: false,
    newMatchesCount: 0,
  },
]

const DEFAULT_RECENTLY_VIEWED = [
  { propertyId: 'prop-1', viewedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), timeLabel: '25 mins ago' },
  { propertyId: 'prop-2', viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), timeLabel: '2 hours ago' },
  { propertyId: 'prop-3', viewedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), timeLabel: 'Yesterday 4:15 PM' },
  { propertyId: 'prop-4', viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), timeLabel: 'Yesterday 11:30 AM' },
  { propertyId: 'prop-5', viewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), timeLabel: '3 days ago' },
  { propertyId: 'prop-6', viewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), timeLabel: '4 days ago' },
]

const DEFAULT_FAVORITES = ['prop-1', 'prop-3', 'prop-5']

// Safe LocalStorage helpers
function readStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return fallback
    return JSON.parse(item)
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage`, err)
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent('boardmate_storage_update', { detail: { key, value } }))
  } catch (err) {
    console.warn(`Error writing ${key} to localStorage`, err)
  }
}

// --------------------- COMPARE STORAGE ---------------------
export function getCompareIds() {
  return readStorage(STORAGE_KEYS.COMPARE, DEFAULT_COMPARE)
}

export function addCompareId(propertyId) {
  const current = getCompareIds()
  if (current.includes(propertyId)) {
    return { success: false, message: 'Property is already in comparison list.' }
  }
  if (current.length >= 3) {
    return { success: false, message: 'You can compare a maximum of 3 properties. Please remove one first.' }
  }
  const updated = [...current, propertyId]
  writeStorage(STORAGE_KEYS.COMPARE, updated)
  return { success: true, updated }
}

export function removeCompareId(propertyId) {
  const current = getCompareIds()
  const updated = current.filter((id) => id !== propertyId)
  writeStorage(STORAGE_KEYS.COMPARE, updated)
  return updated
}

export function toggleCompareId(propertyId) {
  const current = getCompareIds()
  if (current.includes(propertyId)) {
    return { success: true, action: 'removed', updated: removeCompareId(propertyId) }
  }
  return addCompareId(propertyId)
}

export function clearCompare() {
  writeStorage(STORAGE_KEYS.COMPARE, [])
  return []
}

// --------------------- SAVED SEARCHES STORAGE ---------------------
export function getSavedSearches() {
  return readStorage(STORAGE_KEYS.SAVED_SEARCHES, DEFAULT_SAVED_SEARCHES)
}

export function addSavedSearch(searchData) {
  const current = getSavedSearches()
  const newSearch = {
    id: `ss-${Date.now()}`,
    name: searchData.name || `Search (${searchData.location || searchData.university || 'Custom'})`,
    university: searchData.university || 'University of Moratuwa (UoM)',
    location: searchData.location || '',
    minRent: Number(searchData.minRent || 0),
    maxRent: Number(searchData.maxRent || 50000),
    roomType: searchData.roomType || 'All Room Types',
    gender: searchData.gender || 'Any Gender',
    distance: searchData.distance || 'any',
    moveInDate: searchData.moveInDate || '',
    facilities: searchData.facilities || [],
    dateSaved: new Date().toISOString().split('T')[0],
    alertsEnabled: true,
    newMatchesCount: Math.floor(Math.random() * 5) + 1,
  }
  const updated = [newSearch, ...current]
  writeStorage(STORAGE_KEYS.SAVED_SEARCHES, updated)
  return newSearch
}

export function updateSavedSearch(id, fields) {
  const current = getSavedSearches()
  const updated = current.map((item) => (item.id === id ? { ...item, ...fields } : item))
  writeStorage(STORAGE_KEYS.SAVED_SEARCHES, updated)
  return updated
}

export function deleteSavedSearch(id) {
  const current = getSavedSearches()
  const updated = current.filter((item) => item.id !== id)
  writeStorage(STORAGE_KEYS.SAVED_SEARCHES, updated)
  return updated
}

export function toggleAlerts(id) {
  const current = getSavedSearches()
  const updated = current.map((item) =>
    item.id === id ? { ...item, alertsEnabled: !item.alertsEnabled } : item
  )
  writeStorage(STORAGE_KEYS.SAVED_SEARCHES, updated)
  return updated
}

// --------------------- RECENTLY VIEWED STORAGE ---------------------
export function getRecentlyViewed() {
  return readStorage(STORAGE_KEYS.RECENTLY_VIEWED, DEFAULT_RECENTLY_VIEWED)
}

export function recordPropertyView(propertyId) {
  const current = getRecentlyViewed()
  const now = new Date()
  const existingFiltered = current.filter((item) => item.propertyId !== propertyId)
  const updated = [
    { propertyId, viewedAt: now.toISOString(), timeLabel: 'Just now' },
    ...existingFiltered,
  ]
  writeStorage(STORAGE_KEYS.RECENTLY_VIEWED, updated)
  return updated
}

export function removeRecentlyViewed(propertyId) {
  const current = getRecentlyViewed()
  const updated = current.filter((item) => item.propertyId !== propertyId)
  writeStorage(STORAGE_KEYS.RECENTLY_VIEWED, updated)
  return updated
}

export function clearRecentlyViewed() {
  writeStorage(STORAGE_KEYS.RECENTLY_VIEWED, [])
  return []
}

// --------------------- FAVORITES STORAGE ---------------------
export function getFavorites() {
  return readStorage(STORAGE_KEYS.FAVORITES, DEFAULT_FAVORITES)
}

export function toggleFavorite(propertyId) {
  const current = getFavorites()
  const updated = current.includes(propertyId)
    ? current.filter((id) => id !== propertyId)
    : [...current, propertyId]
  writeStorage(STORAGE_KEYS.FAVORITES, updated)
  return updated
}

