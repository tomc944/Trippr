import React from 'react'
import { render } from 'react-dom'

const FooterComponent = React.createClass({
  render() {
    return (
      <footer className="footer">
        Design by <a href="https://github.com/tomc944">Thomas Claiborne</a>
        and <a href="https://github.com/bmhayzlett">Brian Hayzlett</a>
      </footer>
    )
  }
})

export default FooterComponent;
