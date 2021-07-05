interface IListener<T> {
  (val: T): void
}

interface IUnSubscriber {
  (): void
}

class InitialStateService<T> {
  private value: T

  private listeners: IListener<T>[] = []

  constructor(value: T) {
    this.value = value
  }

  set state(value) {
    if (this.value !== value) {
      this.value = value
      this.listeners.forEach((listener) => listener(value))
    }
  }

  get state(): T {
    return this.value
  }

  subscribe(listener: IListener<T>): IUnSubscriber {
    this.listeners.push(listener)
    return (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }
}

export default InitialStateService
