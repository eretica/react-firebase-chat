import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import useRouter from 'use-react-router'
import { toast } from 'react-toastify'
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { DvrOutlined } from '@material-ui/icons'
import { paths } from '../paths'
import { IUserActions } from '../actions/user'
import { ILoginUser } from '../types'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  login: (payload: IUserActions['login']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Home: FC<IProps> = ({ login, loginUser }) => {
  const { history } = useRouter()
  const [posting, setPosting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const classes = useStyles()

  useEffect(() => {
    if (!loginUser) {
      return
    }

    history.push(paths.room)
  }, [loginUser])

  return (
    <Container component="main" maxWidth="xs">
      <Helmet title="Chat" />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DvrOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          チャット
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault()
            const name = inputRef.current!.value

            if (name.length === 0) {
              return
            }

            setPosting(true)
            login({ name })
              .then(() => {
                toast.success('入室しました')
              })
              .catch(() => {
                toast.error('入室できませんでした')
                setPosting(false)
              })
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="handleName"
            label="ハンドルネーム"
            name="handleName"
            autoComplete="off"
            inputRef={inputRef}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={posting}
            className={classes.submit}
          >
            入場
          </Button>
        </form>
      </div>
    </Container>
  )
}
