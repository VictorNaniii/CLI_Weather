#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './service/api.service.js'
import {
  printHelp,
  printSuccess,
  prinError,
  printWeather,
} from './service/log.service.js'
import {
  getKeyValue,
  saveKeyValue,
  tokenDictionar,
} from './service/storage.service.js'

const saveToken = async (token) => {
  if (!token) {
    prinError('Token is required')
    return
  }

  try {
    await saveKeyValue(tokenDictionar.token, token)
    printSuccess('Token saved')
  } catch (error) {
    prinError(error.message)
  }
}

const saveCity = async (city) => {
  if (!city) {
    prinError('City is required')
    return
  }

  try {
    await saveKeyValue(tokenDictionar.city, city)
    printSuccess('City saved')
  } catch (error) {
    prinError(error.message)
  }
}
const foreCast = async () => {
  try {
    const city = process.env.CYTI ?? (await getKeyValue(tokenDictionar))
    const weather = await getWeather('city')
    printWeather(weather, '')
  } catch (error) {
    if (error?.response?.status == 404) {
      prinError('Incorect set city')
    } else if (error?.response?.status == 401) {
      prinError('Incorect token')
    } else {
      prinError(error.message)
    }
  }
}
const initCLI = async () => {
  const args = getArgs(process.argv)

  if (args.h) {
    return printHelp()
  } else if (args.s) {
    return saveCity(args.s)
  } else if (args.t) {
    return saveToken(args.t)
  } else {
    return foreCast()
  }
}

initCLI()
