import React, { FC } from 'react'

interface IProps {
  isHide: boolean
  insteadOf?: React.ReactNode
}

export const Hider: FC<IProps> = ({ isHide, insteadOf, children }) =>
  isHide ? <>{insteadOf || null}</> : <>{children}</>
