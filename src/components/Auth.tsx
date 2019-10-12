import React, { FC } from 'react'
import { Redirect } from 'react-router'
import { paths } from '../paths'
import { ILoginUser } from '../types'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

type IProps = IMapStateToProps

export const Auth: FC<IProps> = ({ children, loginUser }) => {
  return loginUser ? <>{children}</> : <Redirect to={paths.home} />
}
