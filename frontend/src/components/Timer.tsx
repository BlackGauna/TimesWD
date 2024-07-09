import Button from "react-bootstrap/Button"
import svgStyles from "@styles/svg.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { treaty } from "@elysiajs/eden"
import { App } from "../../../backend/server"

const client = treaty<App>(import.meta.env.VITE_SERVER_URL)

function Timer() {
  const [sessionId, setSessionId] = useState(-1)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const [startDisabled, setStartDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)

  const { userId } = useParams()
  const navigate = useNavigate()

  // get started time from local storage, when user reloaded the page
  useEffect(() => {
    const startfromLS = localStorage.getItem("starttime")
    console.log("startfromLS", startfromLS)

    if (startfromLS !== null) {
      const startDate = new Date(startfromLS)
      setStartTime(startDate)

      setStartDisabled(true)
      setStopDisabled(false)
    }
  }, [])

  const onStart = async () => {
    setStartDisabled(true)

    const startDate = new Date().toISOString()
    setStartTime(startDate)

    console.log("startTime", new Date(startDate).toLocaleTimeString())

    try {
      const res = await client.worktime.startsession.post({
        userId: parseInt(userId),
        startDate: startDate,
      })
      console.log(res.data)

      setSessionId(res.data)
    } catch (error) {
      setStartDisabled(false)

      throw new Error("Could not start session, please try again")
    }
    localStorage.setItem("starttime", startDate)

    setStopDisabled(false)
  }

  const onStop = async () => {
    setStopDisabled(true)

    const endDate = new Date().toISOString()

    console.log("endDate", new Date(endDate).toLocaleTimeString())

    try {
      await client.worktime.endsession.post({
        sessionId: sessionId,
        endDate: endDate,
      })
    } catch (error) {
      setStopDisabled(false)
      throw new Error(
        "Could not save end time to database. Please contact support."
      )
    }

    localStorage.clear()
    setStartDisabled(false)
  }

  return (
    <div className="vw-100 vh-100 row align-content-center justify-content-center">
      <div className="w-100 d-flex justify-content-evenly">
        <Button
          className={`rounded-circle ${svgStyles.buttonplay} ${svgStyles.button}`}
          variant="outline-primary"
          onClick={onStart}
          disabled={startDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className={`${svgStyles.svg} ${svgStyles.play}`}
            //   fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
          </svg>
        </Button>
        <Button
          className={`rounded-circle ${svgStyles.buttonstop} ${svgStyles.button}`}
          variant="outline-primary"
          disabled={stopDisabled}
          onClick={onStop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`${svgStyles.svg} ${svgStyles.stop}`}
            viewBox="0 0 16 16"
          >
            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" />
          </svg>
        </Button>
      </div>

      <div className="d-flex justify-content-center">
        <Button onClick={() => navigate(`/overview/${userId}`)}>
          Übersicht
        </Button>
      </div>
    </div>
  )
}

export default Timer
