import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {messages: props.messages}
  }

  handleChange = (request) => {
    alert('i got to the messages handler!' + request.target.name)
    // let updatedItems = [...this.state.items];
    // let itemIndex = this.state.items.findIndex((item) => item.product.id === request.product.id)
    // if (itemIndex > -1) {
    //   let item = updatedItems[itemIndex]
    //   item.quantity = parseInt(item.quantity, 10) + parseInt(request.quantity, 10)
    // } else {
    //   updatedItems.push(request)
    // }
    // this.setState({...this.state, items:updatedItems})
  }

  render() {
    return (
      <div className="container">
        {this.state.messages.map((message, i) => {
          return (
            <Message key={i}
              message={message}
              handler={this.handleChange}/>
          )
        })}
      </div>
    )
  }
}

export default Messages
