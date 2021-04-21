import React, { useCallback, useState } from 'react'
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
import { CityType } from '../types'

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

  const [citiesList, setCitiesList] = useState<CityType[]>([])

  const [searchInput, setSearchInput] = useState<string>('')

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

  const onSearchCity = useCallback(
    () => searchCityByName({ variables: { cityName: searchInput } }),
    [searchInput]
  )

  const onSearchChange = useCallback(e => setSearchInput(e.target.value), [])

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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={isSearchByNameLoading}
                onClick={onSearchCity}
              >
                {isSearchByNameLoading ? 'Loading...' : 'Search'}
              </Button>
            </Grid>
            {!!searchInput && !!searchByNameResult?.getCityByName && (
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
