import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import Messages from './components/Messages'
import ComposeForm from './components/ComposeForm'
import Toolbar from './components/Toolbar'
import { getMessages } from './actions/getMessages'

class App extends React.Component {

  async componentDidMount() {
    this.props.getMessages();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Inbox</h1>
        </header>
        <Toolbar />
        <ComposeForm />
        <Messages />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App)
