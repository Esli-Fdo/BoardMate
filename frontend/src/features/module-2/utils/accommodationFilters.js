
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
}

export function filterAccommodations(properties, filters) {
    return properties.filter((item) => {
        if (
            filters.university &&
            filters.university !== 'All Universities' &&
            item.university !== filters.university
        ) {
            return false
        }

        if (filters.location?.trim()) {
            const query = filters.location.toLowerCase().trim()
            const searchableText =
                `${item.location} ${item.city || ''} ${item.area || ''} ${item.fullAddress || ''}`.toLowerCase()

            const tokens = query.split(/[,/\s]+/).filter(Boolean)

            if (
                !searchableText.includes(query) &&
                !tokens.some((token) => searchableText.includes(token))
            ) {
                return false
            }
        }

        if (
            filters.roomType &&
            filters.roomType !== 'All Room Types' &&
            item.roomType !== filters.roomType
        ) {
            return false
        }

        if (
            filters.gender &&
            filters.gender !== 'Any Gender' &&
            item.gender !== filters.gender &&
            item.gender !== 'Any Gender'
        ) {
            return false
        }

        const min = Number(filters.minRent) || 0
        const max =
            Number(filters.maxRent) > 0
                ? Number(filters.maxRent)
                : Infinity

        if (item.rent < min || item.rent > max) return false

        if (filters.distance && filters.distance !== 'any') {
            const maxDistance = Number(filters.distance)

            if (!Number.isNaN(maxDistance) && item.distance > maxDistance) {
                return false
            }
        }

        if (
            filters.moveInDate &&
            item.availableFrom &&
            item.availableFrom > filters.moveInDate
        ) {
            return false
        }

        if (
            filters.facilities?.length > 0 &&
            !filters.facilities.every((facility) =>
                item.facilities.includes(facility),
            )
        ) {
            return false
        }

        return true
    })
}
