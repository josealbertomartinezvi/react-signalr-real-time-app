import './App.css'
import { SignalrProvider } from './context'
import { Home } from './pages'

function App() {

  return (
    <SignalrProvider>
      <Home />
    </SignalrProvider>
  )
}

export default App
