import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMessage } from '../actions/addMessage'
import { closeCompose } from '../actions/composeMessage'

const ComposeForm = ({isComposeOpen, addMessage, closeCompose}) => {

  const resetComposeForm = () => {
    document.getElementById('subject').value=""
    document.getElementById('body').value=""
  }

  const handleCompose = (event) => {
    event.preventDefault()
    const request = {
      subject: event.target.subject.value,
      body: event.target.body.value}
    addMessage(request)
    resetComposeForm()
    closeCompose()
  }

  return (
    <div>
      <form className={`form-horizontal well ${isComposeOpen ? '' : 'hidden'}`} onSubmit={handleCompose}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" name="subject" placeholder="Enter a subject"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"/>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  isComposeOpen: state.App.isComposeOpen
})

const mapDispatchToProps = dispatch => bindActionCreators({
  closeCompose,
  addMessage,
}, dispatch)

export default connect(
  mapStateToProps, mapDispatchToProps
)(ComposeForm)
