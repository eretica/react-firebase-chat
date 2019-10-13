import React, { FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import {
  makeStyles,
  ListItem,
  List,
  Paper,
  Typography,
  Grid,
  ListItemText,
  TextField,
  FormControl,
  InputAdornment,
  Container,
} from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import { animateScroll } from 'react-scroll'
import { ILoginUser } from '../types'
import { useMessage } from '../hooks/useMessage'
import { Loading } from './Loading'
import { Hider } from './Hider'

export type IMapStateToProps = {
  loginUser: ILoginUser
}

type IProps = IMapStateToProps

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  footer: {
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

const useMessageStyles = makeStyles(() => ({
  messageRoot: {
    paddingTop: 'initial',
    paddingBottom: 'initial',
    width: '80%',
  },
  messageBody: {
    backgroundColor: '#c6e5ff',
    padding: '10px',
    marginLeft: '15px',
    width: 'fit-content',
    borderRadius: '10px',
  },
}))

const useMessageStylesForMe = makeStyles(() => ({
  messageRoot: {
    textAlign: 'right',
    paddingTop: 'initial',
    paddingBottom: 'initial',
    width: '80%',
  },
  messageBody: {
    border: 'solid 2px',
    display: 'inline-block',
    padding: '10px',
    marginRight: '15px',
    width: 'fit-content',
    borderRadius: '10px',
  },
}))

export const Room: FC<IProps> = ({ loginUser }) => {
  const classes = useStyles()
  const messageClasses = useMessageStyles()
  const messageClassesForMe = useMessageStylesForMe()
  const inputRef = useRef<HTMLInputElement>(null)
  const prevCountRef = useRef(0)
  const { messages, addMessage, initialized } = useMessage()

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: prevCountRef.current ? 800 : 0,
    })
    prevCountRef.current = messages.length
  }, [messages])

  const handleSubmit = () => {
    const message = inputRef.current!.value.trim()
    if (message.length === 0) {
      return
    }
    addMessage(loginUser, message).catch(() => {
      toast.error('メッセージが送信できませんでした')
    })

    inputRef.current!.value = ''
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
    <div>
      <Helmet title="Room" />
      <Hider isHide={!initialized} insteadOf={<Loading />}>
        <List className={classes.root}>
          {messages.map(message => {
            const fromMe = message.uid === loginUser.uid
            const messageClass = fromMe ? messageClassesForMe : messageClasses
            return (
              <Grid
                key={message.id}
                container
                direction="row"
                justify={fromMe ? 'flex-end' : 'flex-start'}
                alignItems="center"
              >
                <ListItem alignItems="flex-start" className={messageClass.messageRoot}>
                  <ListItemText
                    primary={
                      <span>
                        <Typography component="span" variant="caption">
                          {message.userName}
                        </Typography>
                      </span>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <div className={messageClass.messageBody}>
                        <Typography
                          component="span"
                          variant="body1"
                          color="textPrimary"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          {message.message}
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
              </Grid>
            )
          })}
        </List>
      </Hider>
      <form
        style={{ paddingTop: '60px' }}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
          className={classes.footer}
        >
          <Container maxWidth="md">
            <Grid item xs={12}>
              <Paper>
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label="message"
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
      </form>
    </div>
  )
}
