import React, { Component } from 'react'

import { currentYear, timestampToDateString, buildFormErrors } from './helpers'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      errors: {

      }
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/feedbacks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedback: {
          source: "history-mapped feedback",
          body: {
            message: this.state.message || null,
            name: this.state.name || null,
            email: this.state.email || null
          }
        }
      })
    }).then((res) => {
      if (res.status === 422) {
        // validations failed
        res.json().then((body) => {
          console.log("errors", body)
          this.setState({errors: body})
        })
      } else if (res.status === 500) {
        // server down
        res.json().then(() => {
          console.log("the server is not responding")
        })
      } else if (res.status === 201) {
        // created successfully
        res.json().then((body) => {
          console.log("success!", body)
          this.setState({errors: {"Success!": ["form sent successfully"]}}) // follow rails api error format
          this.refs.message.value = ""
          this.refs.email.value = ""
          this.refs.name.value = ""
          // this.toggle()
        })
      } else {
        // some other error
        console.log("some other error")
      }
    })
  }

  handleInput(name, e) {
    this.setState({[name]: e.target.value})
  }

  render() {
    const errors = buildFormErrors(this.state.errors)
    return (
      <footer>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Suggestions?</ModalHeader>
          <ModalBody>
            <p>Hey, Got some feedback for the website? Bugs, Features, Let me know! - Zach</p>
            {errors}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="message"><span style={{color: "red"}}>*</span>Message</label>
              <textarea ref="message" id="message" className="form-control" type="text" onKeyUp={this.handleInput.bind(this, "message")}></textarea>
              <label htmlFor="name">Name</label>
              <input ref="name" id="name" className="form-control" type="text" onKeyUp={this.handleInput.bind(this, "name")} />
              <label htmlFor="name">Email</label>
              <input ref="email" id="email" className="form-control" type="text" onKeyUp={this.handleInput.bind(this, "email")} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit.bind(this)}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

        <p className="d-none d-sm-block">
          <a href="https://github.com/zachlevy/history-mapped" target="_blank">Built</a> by <a href="https://www.zachlevy.me" target="_blank">Zach Levy</a> &amp; <a href="https://github.com/zachlevy/history-mapped/graphs/contributors" target="_blank">others</a>
          &nbsp;&copy; {currentYear}.
          Last updated {timestampToDateString(process.env.REACT_APP_TIMESTAMP)}
        </p>
        <div className="row text-center d-none d-sm-block">
          <div className="col-12">
            <ul className="list-inline social-links">
              <li className="list-inline-item"><h4><a href="https://github.com/zachlevy" target="_blank" ><i className="fa fa-github"></i></a></h4></li>
              <li className="list-inline-item"><h4><a href="https://www.facebook.com/zacharyaaronlevy" target="_blank" ><i className="fa fa-facebook"></i></a></h4></li>
              <li className="list-inline-item"><h4><a href="https://twitter.com/zachary_levy" target="_blank" ><i className="fa fa-twitter"></i></a></h4></li>
              <li className="list-inline-item"><h4><a href="https://www.linkedin.com/in/zacharylevy/" target="_blank" ><i className="fa fa-linkedin"></i></a></h4></li>
              <li className="list-inline-item"><h4><a href="https://www.youtube.com/channel/UC8TCWJJKgsFJFHM-pVlTSEg" target="_blank" ><i className="fa fa-youtube"></i></a></h4></li>
              <li className="list-inline-item paypal-button-wrapper">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" className="paypal-button">

                  <input type="hidden" name="business"
                      value="zach@firstexitmedia.com" />

                  <input type="hidden" name="cmd" value="_donations" />

                  <input type="hidden" name="item_name" value="Help keep History Mapped functioning and up to date" />
                  <input type="hidden" name="item_number" value="Thanks!" />
                  <input type="hidden" name="currency_code" value="USD" />

                  <input type="image" name="submit"
                  src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png"
                  alt="Donate" />
                  <img alt="" width="1" height="1"
                  src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />
                </form>
              </li>
              <li className="list-inline-item paypal-button-wrapper">
                <Button disabled={this.state.feedback} size="sm" color="danger" onClick={this.toggle.bind(this)}>Feedback?</Button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
