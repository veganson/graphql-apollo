import React, { useCallback, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { City } from './City'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { CityType } from '../types'

const GET_CITY_BY_NAME = gql`
  query GetCityByName {
    getCityByName(name: "Minsk") {
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
  const [citiesList, setCitiesList] = useState<CityType[]>([])
  const addCity = useCallback(
    city => setCitiesList(curCities => [...curCities, city]),
    []
  )

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Cities">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell align="right">Weather</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Clouds</TableCell>
            <TableCell align="right">Wind</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citiesList.map(city => (
            <City city={city} key={city.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
