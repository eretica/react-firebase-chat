import React, { FC } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { LinearProgress } from '@material-ui/core'

export const Loading: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 99,
    paddingTop: '2em',
  },
})
