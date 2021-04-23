import React, { useCallback, useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { City } from './City'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core'
import debounce from 'lodash.debounce'
import { CityType, UserGeolocationType } from '../types'
import { useUserGeolocation } from '../hooks/useUserGeolocation'

const DEFAULT_CITY = 'Minsk'

const GET_CITY_BY_NAME = gql`
  query GetCityByName($cityName: String!) {
    getCityByName(name: $cityName) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`

export const CitiesList = () => {
  const [
    searchCityByName,
    { loading: isSearchByNameLoading, data: searchByNameResult },
  ] = useLazyQuery(GET_CITY_BY_NAME)

  const [
    searchDefaultCity,
    { loading: isDefaultCitySearchLoading, data: defaultCitySearchResult },
  ] = useLazyQuery(GET_CITY_BY_NAME)

  const [citiesList, setCitiesList] = useState<CityType[]>([])
  const {
    error: locationError,
    isLoading: isCurrentLocationLoading,
    city: currentLocationCity,
  } = useUserGeolocation()
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    if (!isCurrentLocationLoading) {
      searchDefaultCity({
        variables: {
          cityName: currentLocationCity || DEFAULT_CITY,
        },
      })
    }
  }, [isCurrentLocationLoading, currentLocationCity])

  // when default city is fetched, add it to the cities list
  useEffect(() => {
    if (defaultCitySearchResult?.getCityByName) {
      setCitiesList(curCities => [
        defaultCitySearchResult?.getCityByName,
        ...curCities,
      ])
    }
  }, [!!defaultCitySearchResult?.getCityByName])

  const addCity = useCallback(() => {
    setCitiesList(currentCities => [
      ...currentCities,
      searchByNameResult.getCityByName,
    ])
    setSearchInput('')
  }, [searchByNameResult?.getCityByName?.id])

  const onDeleteCity = useCallback(cityId => {
    setCitiesList(currentCities =>
      currentCities.filter(city => city.id !== cityId)
    )
  }, [])

  const triggerSearchByName = useCallback(
    debounce(
      (cityName: string) => searchCityByName({ variables: { cityName } }),
      300
    ),
    [searchCityByName]
  )

  const onSearchChange = useCallback(e => {
    setSearchInput(e.target.value)

    if (e.target.value.length > 2) {
      triggerSearchByName(e.target.value)
    }
  }, [])

  return (
    <Container>
      <TableContainer component={Paper}>
        <Box mt={3}>
          <Grid container justify="center">
            <Grid item>
              <TextField
                size="small"
                variant="outlined"
                value={searchInput}
                placeholder="Search for a city"
                onChange={onSearchChange}
              />
            </Grid>
            {!!isSearchByNameLoading && (
              <Grid item xs={12}>
                <Box mt={3}>Loading...</Box>
              </Grid>
            )}
            {!isSearchByNameLoading &&
              !!searchInput &&
              !!searchByNameResult?.getCityByName && (
                <Grid item xs={12}>
                  <Box mt={3}>
                    {searchByNameResult.getCityByName.name}
                    <Box ml={3} display="inline-block">
                      <Button size="small" variant="outlined" onClick={addCity}>
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
          </Grid>
        </Box>
        <Table aria-label="Cities">
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell align="left">Weather</TableCell>
              <TableCell align="left">Temperature</TableCell>
              <TableCell align="left">Clouds</TableCell>
              <TableCell align="left">Wind</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citiesList.map(city => (
              <City city={city} key={city.id} onDeleteCity={onDeleteCity} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
