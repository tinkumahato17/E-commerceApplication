import { Provider } from "react-redux"
import AppNavigator from "./src/AppNavigator"
import { store } from "./src/redux/Store"

const App = () => {
  return (
   <Provider store={store}>
    <AppNavigator/>
   </Provider>
  )
}

export default App
