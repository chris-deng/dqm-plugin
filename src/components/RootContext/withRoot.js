import React from 'react'

import RootContext from './RootContext'

import hoistNonReactStatics from 'hoist-non-react-statics'

export default function withRoot(Comp) {
  const Enhenced = (props) => (
    <RootContext.Consumer>
      {(rootValue) => <Comp root={rootValue} {...props} />}
    </RootContext.Consumer>
  )

  const C = (props, ref) => <Enhenced {...props} forwardedRef={ref} />

  const displayName = Comp.displayName || Comp.name || 'Component'
  C.displayName = `WithRoot(${displayName})`

  hoistNonReactStatics(C, Comp)

  return React.forwardRef(C)
}
