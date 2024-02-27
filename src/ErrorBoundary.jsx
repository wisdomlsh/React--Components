import { Component } from 'react'

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, msg: error.message }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo, 'error');

  }



  render() {
    if (this.state.hasError) {
      return <div>出错了： {this.state.msg}</div>;
    }
    return this.props.children;
 
  }
}
