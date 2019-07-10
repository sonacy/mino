export type TAppState = {
  name: string
  count: number
}

const AddAction = 'AddAction'
const MinusAction = 'MinusAction'

export const Add = () => {
  return {
    type: AddAction,
  }
}

export const Minus = () => {
  return {
    type: MinusAction,
  }
}

const AppState = (
  state: TAppState = {
    name: 'sonacy',
    count: 0,
  },
  action: {
    type: string
  }
) => {
  switch (action.type) {
    case AddAction:
      return { ...state, count: state.count + 1 }
    case MinusAction:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

export default AppState
