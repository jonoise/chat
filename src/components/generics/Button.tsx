import React, { FC, HTMLAttributes, PropsWithChildren } from 'react'

const Button: FC<PropsWithChildren & HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const { className, ...rest } = props
  return (
    <button
      className={`px-4 py-1 bg-blue-500 rounded text-white ${className}`}
      {...rest}
    >
      {props.children}
    </button>
  )
}

export default Button
