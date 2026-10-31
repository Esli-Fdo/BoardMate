export const initialFilters = {
  university: 'University of Moratuwa (UoM)',
  location: 'Katubedda, Moratuwa',
  roomType: 'All Room Types',
  gender: 'Any Gender',
  minRent: 5000,
  maxRent: 16000,
  distance: '2',
  moveInDate: '2025-05-01',
  facilities: ['Free Wi-Fi', 'Attached Bathroom'],
  verifiedOnly: false,
}

export const defaultResetFilters = {
  university: 'All Universities',
  location: '',
  roomType: 'All Room Types',
  gender: 'Any Gender',
  minRent: 0,
  maxRent: 50000,
  distance: 'any',
  moveInDate: '',
  facilities: [],
  verifiedOnly: false,
}

export function filterAccommodations(properties, filters) {
  if (!filters) return properties

  return properties.filter((item) => {
    // 1. University filter
    if (
      filters.university &&
      filters.university !== 'All Universities' &&
      item.university !== filters.university
    ) {
      return false
    }

    // 2. Location filter (partial, case-insensitive, multi-token)
    if (filters.location && filters.location.trim() !== '') {
      const query = filters.location.toLowerCase().trim()
      const searchableText =
        `${item.location} ${item.city || ''} ${item.area || ''} ${item.fullAddress || ''}`.toLowerCase()

      const tokens = query.split(/[,/\s]+/).filter(Boolean)

      const matches =
        searchableText.includes(query) ||
        tokens.some((token) => searchableText.includes(token))

      if (!matches) return false
    }

    // 3. Room Type filter
    if (
      filters.roomType &&
      filters.roomType !== 'All Room Types' &&
      item.roomType !== filters.roomType
    ) {
      return false
    }

    // 4. Gender preference filter
    if (
      filters.gender &&
      filters.gender !== 'Any Gender' &&
      item.gender !== filters.gender &&
      item.gender !== 'Any Gender'
    ) {
      return false
    }

    // 5. Monthly Rent filter
    const min = Number(filters.minRent) || 0
    const max =
      Number(filters.maxRent) > 0 ? Number(filters.maxRent) : Infinity

    if (item.rent < min || item.rent > max) {
      return false
    }

    // 6. Max Distance filter
    if (filters.distance && filters.distance !== 'any') {
      const maxDistance = Number(filters.distance)
      if (!Number.isNaN(maxDistance) && item.distance > maxDistance) {
        return false
      }
    }

    // 7. Move-in date filter
    if (
      filters.moveInDate &&
      item.availableFrom &&
      item.availableFrom > filters.moveInDate
    ) {
      return false
    }

    // 8. Facilities filter
    if (
      filters.facilities?.length > 0 &&
      !filters.facilities.every((facility) =>
        item.facilities?.includes(facility),
      )
    ) {
      return false
    }

    // 9. Verified Only filter
    if (filters.verifiedOnly && !item.verifiedType) {
      return false
    }

    return true
  })
}
