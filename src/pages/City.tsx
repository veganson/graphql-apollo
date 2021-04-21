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
      <TableCell align="left">
        <Box>{city.weather.summary.title}</Box>
        <Box>{city.weather.summary.description}</Box>
        <Box>
          <img
            src={`http://openweathermap.org/img/w/${city.weather.summary.icon}.png`}
            alt={city.weather.summary.title}
          />
        </Box>
      </TableCell>
      <TableCell align="left">
        <Box>Actual: {city.weather.temperature.actual}</Box>
        <Box>Feels like: {city.weather.temperature.feelsLike}</Box>
        <Box>Min: {city.weather.temperature.min}</Box>
        <Box>Max: {city.weather.temperature.max}</Box>
      </TableCell>
      <TableCell align="left">
        <Box>All: {city.weather.clouds.all}</Box>
        <Box>Visibility: {city.weather.clouds.visibility}</Box>
        <Box>Humidity: {city.weather.clouds.humidity}</Box>
      </TableCell>
      <TableCell align="left">
        <Box>Speed: {city.weather.wind.speed}</Box>
        <Box>Deg: {city.weather.wind.deg}</Box>
      </TableCell>
      <TableCell align="center">
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
