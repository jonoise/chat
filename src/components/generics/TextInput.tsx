import React, { FC, InputHTMLAttributes, PropsWithChildren } from 'react'

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { className, ...rest } = props
  return (
    <input
      {...rest}
      className={`p-2 border border-gray-300 rounded ${className}`}
      type='text'
    />
  )
}
