import chalk from 'chalk'
import dedent from 'dedent-js'

const prinError = (error) => {
  console.log(chalk.bgRed('ERROR') + ' ' + error)
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen('SUCCESS') + ' ' + message)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan('HELP')}
    Without parameters: output weather
    -s [CITY]: Set city
    -h: Show help
    -t [API_KEY]: Save your API key`
  )
}

const printWeather = (res) => {
  console.log(
    dedent`${chalk.bgYellow('Weather')}
    weather in city: ${res.name}
    ${res.weather[0].description}
    Temperature${res.main.temp}
    `
  )
}

export { prinError, printSuccess, printHelp, printWeather }
