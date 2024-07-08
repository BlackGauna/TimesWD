import Button from "react-bootstrap/Button"
import svgStyles from "@styles/svg.module.css"

function Timer() {
  return (
    <div className="vw-100 vh-100 row align-content-center justify-content-center">
      <div className="w-100 d-flex justify-content-evenly">
        <Button
          className={`rounded-circle ${svgStyles.buttonplay} ${svgStyles.button}`}
          variant="outline-primary"
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
        <Button>Übersicht</Button>
      </div>
    </div>
  )
}

export default Timer
