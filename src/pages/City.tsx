import React from 'react'
import { gql } from '@apollo/client'
import { Box, Button, TableCell, TableRow } from '@material-ui/core'
import { CityType } from '../types'

type PropTypes = {
  city: CityType
  onDeleteCity: (e: any) => void
}

export const City = React.memo(({ city, onDeleteCity }: PropTypes) => {
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
      <TableCell align="right">
        <Button
          onClick={() => onDeleteCity(city.id)}
          data-city-id={city.id}
          variant="contained"
          color="secondary"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  )
})
