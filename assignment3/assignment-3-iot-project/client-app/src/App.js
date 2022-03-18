import logo from './logo.svg'
import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import Weather from './components/weather'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/weather' component={Weather} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App
