import { Button, Card } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { IStore } from '../store'
import { Add, Minus } from '../store/appState'

const Main = ({
  name,
  count,
  add,
  minus,
}: ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>) => {
  return (
    <Card title={name}>
      <Button onClick={add}> + </Button>
      <strong style={{ margin: '0 20px' }}>{count}</strong>
      <Button onClick={minus}> - </Button>
    </Card>
  )
}

const mapStateToProps = (state: IStore) => {
  return {
    name: state.appState.name,
    count: state.appState.count,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ add: Add, minus: Minus }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
