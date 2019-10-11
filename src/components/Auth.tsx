import React, { FC } from 'react'
import useRouter from 'use-react-router'
import { paths } from '../paths'
import { ILoginUser } from '../types'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

type IProps = IMapStateToProps

export const Auth: FC<IProps> = ({ children, loginUser }) => {
  const { history } = useRouter()

  if (!loginUser) {
    history.push(paths.home)
    return null
  }

  return <>{children}</>
}
