import { useCallback, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useSessions } from "../middleware/sessionsQuery"

import { type WorkTimeSchema } from "../../../backend/db/schema/worktime"

function Overview() {
  const { userId } = useParams()
  const navigate = useNavigate()

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
    if (!currentDate || !data) return empty
    const selectedSession: WorkTimeSchema[] = []

    for (const session of data!) {
      const startDate = new Date(session.startedAt).toDateString()

      if (startDate === currentDate) {
        selectedSession.push(session)
      }
    }

    return (
      <>
        <span className="d-flex justify-content-center">
          <ul>
            {selectedSession.map((session) => (
              <li key={session.id}>
                {new Date(session.startedAt).toLocaleTimeString() +
                  " - " +
                  new Date(session.endedAt).toLocaleTimeString()}
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
      <div className="d-flex justify-content-center mt-2 mb-5 align-items-center">
        <h2 style={{ position: "relative" }}>
          <Button
            style={{ position: "absolute", right: "120%" }}
            onClick={() => navigate(`/timer/${userId}`)}
          >
            Zurück
          </Button>
          Übersicht
        </h2>
      </div>

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
