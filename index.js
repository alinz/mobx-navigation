// @flow

import * as React from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'

export class MobxNavigationStore {
  @observable.ref navigationState: any
  appNavigator: any

  constructor(appNavigator: any, routeName: string) {
    this.appNavigator = appNavigator
    this.dispatch(appNavigator.router.getActionForPathAndParams(routeName))
  }

  @action
  dispatch = (action: any, stackNavState: boolean = true) => {
    const previousNavState = stackNavState ? this.navigationState : null
    this.navigationState = this.appNavigator.router.getStateForAction(action, previousNavState)
  }
}

type MobxNavigationProps = {
  store: MobxNavigationStore,
  listener?: (type: any, fn: any) => void,
  children: (navigation: any) => React.Node
}

@observer
export class MobxNavigation extends React.Component<MobxNavigationProps> {
  static defaultProps = {
    listener: () => {}
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = (): boolean => {
    const { store } = this.props

    if (store.navigationState.index === 0) {
      return false
    }

    store.dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { children, store, listener } = this.props

    return children(
      addNavigationHelpers({
        dispatch: store.dispatch,
        state: store.navigationState,
        addListener: listener
      })
    )
  }
}
