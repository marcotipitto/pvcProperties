import React, {useEffect} from 'react'

const generateColor = () => {
    return '#' + (Math.random() * 0xFFFFFF<<0).toString(16)
}

const CounterView = React.memo((props) => {

    const {countValue, handleIncrement} = props;

    useEffect(() => {
        console.log('Calling UseEffect')
    })

    return (
        <div style={{background: generateColor()}}>
            <h1 className="value">{countValue}</h1>
            <button onClick={() => handleIncrement(2)}>
                Increment
                </button>
            <button onClick={() => handleIncrement(-4)}>
                Decrement
            </button>
        </div>
    )
})

export default CounterView
// export default React.memo(CounterView)