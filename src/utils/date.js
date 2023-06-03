function setDateToOnlyDate (date = new Date()) {
  date.setHours(0, 0, 0, 0)
}

function compareDates ({ firstDate = new Date(), secondDate = new Date() }) {
  setDateToOnlyDate(firstDate)
  setDateToOnlyDate(secondDate)

  const milisegundos = [
    firstDate.getTime(),
    secondDate.getTime()
  ]

  return milisegundos[0] === milisegundos[1]
}

module.exports = { compareDates }
