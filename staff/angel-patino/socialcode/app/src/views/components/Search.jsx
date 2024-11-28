import { useLocation, useNavigate } from "react-router-dom"
import Text from "../../components/core/Text"
import Button from "../../components/core/Button"
import { useEffect } from "react"

export default () => {
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const q = searchParams.get("q")

  const navigate = useNavigate()

  const handleLuckyClick = () => {
    navigate("/search?q=amfeelinglucky")
  }

  useEffect(() => {
    console.log("TODO call api to search: " + q)
  }, [q])

  return (
    <>
      <Text className="mt-10 p-10">Search: {q}</Text>

      <Button onClick={handleLuckyClick}>I'm feeling lucky</Button>
    </>
  )
}
