const NthNumber = ({ number }) => {
  number = parseInt(number)
  let nthNumber = ""
  if (number > 3 && number < 21) {
    nthNumber = "th"
  } else {
    switch (number % 10) {
      case 1:
        nthNumber = "st"
        break
      case 2:
        nthNumber = "nd"
        break
      case 3:
        nthNumber = "rd"
        break
      default:
        nthNumber = "th"
    }
  }

  return <sup>{nthNumber}</sup>
}
export default NthNumber
