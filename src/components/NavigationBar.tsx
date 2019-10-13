import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { AppBar, Toolbar, Typography, Button, Grid, makeStyles } from '@material-ui/core'
import { ILoginUser } from '../types'
import { IUserActions } from '../actions/user'
import { paths } from '../paths'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  logout: (payload: IUserActions['logout']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const NavigationBar: FC<IProps> = ({ loginUser, logout }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Chat
            </Typography>

            {loginUser && (
              <>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Typography variant="h6">{loginUser.name}</Typography>
                </Grid>

                <Button
                  color="inherit"
                  onClick={() => {
                    logout({}).then(() => {
                      toast.warn('退出しました')
                      history.push(paths.home)
                    })
                  }}
                >
                  退出
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '64px',
  },
  title: {
    flexGrow: 1,
  },
}))
