import { useCallback, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useParams } from "react-router-dom"
import { useSessions } from "../middleware/sessionsQuery"

import { type WorkTimeSchema } from "../../../backend/db/schema/worktime"

function Overview() {
  const { userId } = useParams()
  const [currentDate, setCurrentDate] = useState<string | null>(null)

  //  get sessions info from db
  const { data, isPending } = useSessions("1")

  const onDatePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedDate = new Date(e.target.value).toDateString()
    console.log(pickedDate)

    setCurrentDate(pickedDate)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const test = useCallback(() => generateDateSessions(), [currentDate])

  const generateDateSessions = () => {
    const empty = <></>
    if (!currentDate) return empty
    const selectedSession: WorkTimeSchema[] = []

    for (const session of data!) {
      const startDate = new Date(session.startedAt).toDateString()

      if (startDate === currentDate) {
        selectedSession.push(session)
      }
    }

    return (
      <>
        <h3 className="d-flex justify-content-center">
          {new Date(currentDate).toLocaleDateString()}
        </h3>
        <span className="d-flex justify-content-center">
          <ul>
            {selectedSession.map((session) => (
              <li key={session.id}>
                {new Date(session.startedAt).toLocaleTimeString()}-
                {new Date(session.endedAt).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </span>
      </>
    )
  }

  if (!isPending) {
    console.log("data", data)
  }

  return (
    <Container className="row justify-content-center">
      <div className="d-flex justify-content-center mt-2 mb-4">Overview</div>

      <div className="d-flex justify-content-center">
        <input aria-label="Date" type="date" onChange={(e) => onDatePick(e)} />
      </div>
      <div className="row justify-content-center" style={{ marginTop: "5rem" }}>
        {test()}
      </div>
    </Container>
  )
}

export default Overview
