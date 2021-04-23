import { useEffect, useState } from 'react'
import { UserGeolocationType } from '../types'

// free, works without token and easily parseable.
// TODO : switch to something serious
const getCityRequestURL = (lat: number, lng: number) =>
  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`

const fetchCity = (lat: number, lng: number) =>
  fetch(getCityRequestURL(lat, lng))

export const useUserGeolocation = () => {
  const [state, setState] = useState<UserGeolocationType>({
    coords: null,
    city: null,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    if (!window.navigator.geolocation) {
      return
    }

    // get current coords using browser api
    window.navigator.geolocation.getCurrentPosition(
      async result => {
        // save coords for now while we're fetching city
        setState(currentState => ({
          ...currentState,
          error: null,
          coords: result.coords,
        }))

        try {
          const cityFetchResult = await fetchCity(
            result.coords?.latitude,
            result.coords?.longitude
          )
          const cityFetchResultJSON = await cityFetchResult.json()

          setState(currentState => ({
            ...currentState,
            city: cityFetchResultJSON.city,
          }))
        } catch (error) {
          console.error('error while fetching city: ', error)
          setState(currentState => ({
            ...currentState,
            error: error,
          }))
        } finally {
          setState(currentState => ({
            ...currentState,
            isLoading: false,
          }))
        }
      },
      error =>
        setState(currentState => ({
          ...currentState,
          coords: null,
          error: error?.message,
          isLoading: false,
        }))
    )
  }, [])

  return state
}
