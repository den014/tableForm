import { useEffect, useRef, useState } from 'react'
import InitialStateService from './initialStateService'

const useObservable = <T>(observable: InitialStateService<T>): T => {
  const [value, setValue] = useState(observable.state)
  const isMounted = useRef(true)

  const updateLocalState = (data: T): void => {
    if (isMounted.current) setValue(data)
  }

  useEffect(() => {
    updateLocalState(observable.state)
    return observable.subscribe(updateLocalState)
  }, [observable])

  useEffect(
    () => (): void => {
      isMounted.current = false
    },
    []
  )

  return value
}

export default useObservable
