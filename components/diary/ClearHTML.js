const ClearHTML = ({ details }) => {
  details = details.replaceAll("<br/>", ".")
  details = details.replaceAll("<br>", ".")
  return details
}
export default ClearHTML
