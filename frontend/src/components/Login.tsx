import { ChangeEvent, useState } from "react"
import {
  Alert,
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"

import { App } from "../../../backend/server"
import { treaty } from "@elysiajs/eden"
import { useNavigate } from "react-router-dom"

const client = treaty<App>(import.meta.env.VITE_SERVER_URL)

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  const [userId, setUserId] = useState(-1)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const navigate = useNavigate()

  const onChangeUsername = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserName(e.target.value)
    setShowAlert(false)
  }
  const onChangePassword = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value)
  }

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e?.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault()

    const res = await client.user
      .login({ username: userName })({ password: password })
      .get()
    console.log("res", res)

    if (res.error) {
      const error: Error = res.error
      console.log(error.message)

      setAlertMsg(error.message)
      setShowAlert(true)

      e.stopPropagation()
    }
    const userId = res.data
    console.log("userId", userId)
    setUserId(userId)
    navigate(`/timer/${userId}`)
  }

  return (
    <div>
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Form
          noValidate
          validated={validated}
          className="w-50"
          onSubmit={(e) => onLogin(e)}
        >
          <FormGroup className="mb-3">
            <FormLabel>Username</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="Username"
              onChange={(e) => onChangeUsername(e)}
            />
            <Alert variant="danger" show={showAlert}>
              {alertMsg}
            </Alert>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              type="password"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </FormGroup>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Login
