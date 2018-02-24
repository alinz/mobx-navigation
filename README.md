# mobx-navigation (react-native)

simplified the integration of mobx on top of react-navigation.

* [x] Support android hardware back button automatically
* [x] Using render prop for more customization in the future

### Installation

```
yarn add mobx-navigation
```

make sure you have `mobx`, `mobx-react` and `react-navigation` installed.

### Usage

There is a `MobxNavigationStore` which keeps track of navigation state and there is `MobxNavigation` which is a render prop react component.

first you defined your routes in react-navigation style and save it in `routes.js` file

```js
// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

class IndexScreen extends Component<{}, {}> {
  render() {
    return (
      <View>
        <Text>Index Screen</Text>
      </View>
    )
  }
}

class MainScreen extends Component<{}, {}> {
  render() {
    return (
      <View>
        <Text>Main Screen</Text>
      </View>
    )
  }
}

const MainRouter = StackNavigator({
  index: {
    screen: IndexScreen
  },
  main: {
    screen: MainScreen
  }
})

export default MainRouter
```

then wire everything in your main component

```js
// @flow

import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'

import { MobxNavigation, MobxNavigationStore } from 'mobx-navigation'

import MainRouter from './routes'

// instantiating your mobx navigation store
// and pass the react-navigation routes and your default route.
const mobxNavigationStore = new MobxNavigationStore(MainRouter, 'index')

export default class App extends Component<{}, {}> {
  gotoMain = () => {
    mobxNavigationStore.dispatch(
      NavigationActions.navigate({
        routeName: 'main'
      })
    )
  }

  componentDidMount() {
    setTimeout(this.gotoMain, 3000)
  }

  render() {
    return (
      <MobxNavigation store={mobxNavigationStore}>
        {navigation => <MainRouter navigation={navigation} />}
      </MobxNavigation>
    )
  }
}
```

### Credit

thank [Paul Xue](https://hackernoon.com/react-navigation-with-mobx-2064fcdaa25b) for your great article.
