import React, { FC, useEffect, useRef } from 'react'
import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'

interface IFormValue {
  text: string
}

interface IProps {
  onSubmit: (values: IFormValue) => void
  autoClear?: boolean
  label?: string
}

export const FloatTextForm: FC<IProps> = ({ onSubmit, autoClear = true, label }) => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const text = inputRef.current!.value.trim()
    if (text.length === 0) {
      return
    }

    onSubmit({ text })

    if (autoClear) {
      inputRef.current!.value = ''
    }
  }

  const onKeyPress = (e: KeyboardEvent) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('keypress', onKeyPress)
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', onKeyPress)
      }
    }
  }, [inputRef])

  return (
    <div style={{ paddingTop: '60px' }}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-end"
        className={classes.float}
      >
        <Container maxWidth="md">
          <Grid item xs={12}>
            <Paper>
              <FormControl fullWidth>
                <TextField
                  multiline
                  label={label}
                  variant="outlined"
                  inputRef={inputRef}
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        className={classes.sendButton}
                        position="end"
                        onClick={() => {
                          handleSubmit()
                        }}
                      >
                        <SendOutlined color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Paper>
          </Grid>
        </Container>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  float: {
    position: 'fixed',
    left: 0,
    bottom: '1vh',
    width: '100%',
    textAlign: 'center',
  },
  sendButton: {
    cursor: 'pointer',
  },
}))
