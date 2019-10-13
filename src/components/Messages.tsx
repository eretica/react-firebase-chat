import React, { FC } from 'react'
import { Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import { ILoginUser, IMessage } from '../types'

interface IProps {
  loginUser: ILoginUser
  messages: IMessage[]
}

export const Messages: FC<IProps> = ({ messages, loginUser }) => {
  const messageClasses = useMessageStyles()
  const messageClassesForMe = useMessageStylesForMe()

  return (
    <List>
      {messages.map(message => {
        const fromMe = message.uid === loginUser.uid
        const classes = fromMe ? messageClassesForMe : messageClasses
        return (
          <Grid
            key={message.id}
            container
            direction="row"
            justify={fromMe ? 'flex-end' : 'flex-start'}
            alignItems="center"
          >
            <ListItem alignItems="flex-start" className={classes.messageRoot}>
              <ListItemText
                primary={
                  <span>
                    {!fromMe && (
                      <Typography component="span" variant="body2">
                        {message.userName}
                      </Typography>
                    )}
                  </span>
                }
                secondaryTypographyProps={{ component: 'div' }}
                secondary={
                  <>
                    <div className={classes.messageWrapper}>
                      <Typography
                        className={classes.messageContent}
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        {message.message}
                      </Typography>
                    </div>

                    <Typography
                      component="span"
                      variant="caption"
                      className={classes.messagePostDate}
                    >
                      {message.createdAt
                        ? format(message.createdAt.toDate(), 'yyyy-MM-dd hh:mm')
                        : ''}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </Grid>
        )
      })}
    </List>
  )
}

const useMessageStyles = makeStyles(() => ({
  messageRoot: {
    paddingTop: 'initial',
    paddingBottom: 'initial',
    width: '80%',
  },
  messageWrapper: {
    backgroundColor: '#c6e5ff',
    padding: '10px',
    marginLeft: '10px',
    width: 'fit-content',
    borderRadius: '10px',
  },
  messageContent: {
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
  },
  messagePostDate: {
    display: 'block',
    marginLeft: '10px',
  },
}))

const useMessageStylesForMe = makeStyles(() => ({
  messageRoot: {
    textAlign: 'right',
    paddingTop: 'initial',
    paddingBottom: 'initial',
    width: '80%',
  },
  messageWrapper: {
    border: 'solid 2px',
    display: 'inline-block',
    padding: '10px',
    marginRight: '10px',
    width: 'fit-content',
    borderRadius: '10px',
  },
  messageContent: {
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
  },
  messagePostDate: {
    display: 'block',
    marginRight: '10px',
  },
}))
