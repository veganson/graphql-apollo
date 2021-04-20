import React, { useCallback, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box, TableCell, TableRow } from '@material-ui/core'
import { CityType } from '../types'

const GET_CITY_BY_ID = gql`
  query GetCityById {
    getCityById(id: $cityId) {
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

type PropTypes = {
  city: CityType,
}

export const City = ({ city }: PropTypes) => {
  const { loading, error, data } = useQuery(GET_CITY_BY_ID, {
    variables: { cityId: city.id },
  })
  console.log('kekus', data?.getCityByName)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <TableRow>
      <TableCell component="th" scope="city">
        {city.name}
      </TableCell>
      <TableCell align="right">
        <Box>{city.weather.summary.title}</Box>
        <Box>{city.weather.summary.description}</Box>
        <Box>{city.weather.summary.icon}</Box>
      </TableCell>
      <TableCell align="right">
        <Box>{city.weather.temperature.actual}</Box>
        <Box>{city.weather.temperature.feelsLike}</Box>
        <Box>{city.weather.temperature.min}</Box>
        <Box>{city.weather.temperature.max}</Box>
      </TableCell>
      <TableCell align="right">
        <Box>{city.weather.clouds.all}</Box>
        <Box>{city.weather.clouds.visibility}</Box>
        <Box>{city.weather.clouds.humidity}</Box>
      </TableCell>
      <TableCell align="right">
        <Box>{city.weather.wind.speed}</Box>
        <Box>{city.weather.wind.deg}</Box>
      </TableCell>
    </TableRow>
  )
}
