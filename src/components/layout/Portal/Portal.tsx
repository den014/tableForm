import React from 'react'
import ReactDOM from 'react-dom'

const portalNode = document.getElementById('portal')

const Portal: React.FC = ({ children }) => {
  if (!portalNode) return null

  return ReactDOM.createPortal(children, portalNode)
}

export default Portal
