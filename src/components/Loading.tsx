import React, { FC } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 99,
    paddingTop: '2em',
  },
})

export const Loading: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
    </div>
  )
}
