import React from 'react'

export const UserContext = React.createContext({
  loading: false,
  error: null,
  data: null,
  refetch: () => {}
})
