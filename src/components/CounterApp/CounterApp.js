import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'
import './CounterApp.css'
import CounterView from './CounterView';

const functions = new Set();

const CounterApp = (props) => {

    const [count, setCount] = useState(0);
    const [whatever, setWhatever] = useState(10);
    // const title = props.title
    const { title } = props;

    // const increment = (step) => setCount(count + step);
    // const doWhatever = () => setWhatever(whatever + 1);

    const increment = useCallback((step) => setCount(count + step), [count]);
    const doWhatever = useCallback(() => setWhatever(whatever + 1), [whatever])

    functions.add(increment);
    functions.add(doWhatever);
    
    return (
        <div className="counter-app">
            <h1>{title}</h1>
            <CounterView countValue={count} handleIncrement={increment}/>
            <button onClick={doWhatever}>Do Whatever</button>
            <br/>
            {functions.size}
        </div>
    )
}

// CounterApp.propTypes = {
//     title: PropTypes.string.isRequired
// }

// class CounterApp extends React.Component {

//     constructor() {
//         super();
//         // this.increment = this.increment.bind(this);
//         // this.decrement = this.decrement.bind(this);
//     }

//     state = {
//         count: 0
//     }

//     increment() {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }

//     decrement() {
//         this.setState({
//             count: this.state.count - 1
//         })
//     }

//     // componentDidMount() {
//     //     alert('Component did mount called')
//     // }

//     // componentDidUpdate() {
//     //     alert('component did update called')
//     // }

//     render() {
//         const { count } = this.state;
//         const { title } = this.props;
//         return (
//             <div className="counter-app">
//                 <h1>{title}</h1>
//                 <h1 className="value">{count}</h1>
//                 <button onClick={() => this.increment()}>
//                     Increment
//                 </button>
//                 <button onClick={() => this.decrement()}>
//                     Decrement
//             </button>
//             </div>
//         )
//     }
// }

export default CounterApp