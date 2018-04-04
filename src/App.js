import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import Messages from './components/Messages'
import ComposeForm from './components/ComposeForm'
import Toolbar from './components/Toolbar'
import { getMessages } from './actions/getMessages'
import { addMessage } from './actions/addMessage'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      composeOpen: false};
  }

  async componentDidMount() {
    this.props.getMessages();
  }

  findMessage = (id) => this.state.messages.findIndex((message) => (message.id === parseInt(id, 10)))

  async updateMessage (requestBody) {
    // const response = await fetch('/api/messages', {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }})
  }

  selectedMessageIds = (messages) => messages.filter = (message) => message.selected

  handleOpenCompose = () => {
    this.setState({...this.state, "composeOpen": !this.state.composeOpen})
  }

  buildRequest = (target) => ({subject: target.subject.value, body: target.body.value})

  resetComposeForm = () => {
    document.getElementById('subject').value=""
    document.getElementById('body').value=""
  }

  handleCompose = (event) => {
    event.preventDefault()
    const request = this.buildRequest(event.target)
    this.props.addMessage(request)
    this.resetComposeForm()
    this.setState({...this.state, "composeOpen": false})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Inbox</h1>
        </header>
        <Toolbar
          openComposeHandler={this.handleOpenCompose.bind(this)}
        />
        <ComposeForm
          composeHandler={this.handleCompose.bind(this)}
          composeOpen={this.state.composeOpen}
        />
        <Messages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage,
  getMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
