import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    clearMemory() {
        this.setState({ ...initialState })
    }

    calc(value1, value2, op) {
        console.log('calculando ..')
        switch (op) {
            case '/':
                return value1 / value2
            case '*':
                return value1 * value2
            case '-':
                return value1 - value2
            default:
                return value1 + value2
        }
    }

    setOperation(op) {
        let values = [...this.state.values]
        if (this.state.current === 0) {
            if (op === '=') {
                let result = this.calc(values[0], values[1], op)
                values[0] = result
                result = result.toString()
                this.setState({ displayValue: result, values, operation: null, clearDisplay: true, current: 0})
                console.log(values)
                return
            }

            this.setState({operation: op, current: 1, clearDisplay: true})
        } else {
            if (op === '=') {
                let result = this.calc(values[0], values[1], this.state.operation)
                values[0] = result
                result = result.toString()
                this.setState({ displayValue: result, values, operation: null, clearDisplay: true, current: 0})
                console.log(values)
                return
            }
            // this.setState({operation: op, clearDisplay: true})
            let result = this.calc(values[0], values[1], this.state.operation)
            values[0] = result
            result = result.toString()
            this.setState({ displayValue: result, values, operation: op, clearDisplay: true })
            console.log(values)
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) return
        const clearDisplay = (n !== '.' && this.state.displayValue === '0')
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        const clearMemory = () => this.clearMemory()
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label='AC' triple click={clearMemory} />
                <Button label='/' operation click={setOperation} />
                <Button label='7' click={addDigit} />
                <Button label='8' click={addDigit} />
                <Button label='9' click={addDigit} />
                <Button label='*' operation click={setOperation} />
                <Button label='4' click={addDigit} />
                <Button label='5' click={addDigit} />
                <Button label='6' click={addDigit} />
                <Button label='-' operation click={setOperation} />
                <Button label='1' click={addDigit} />
                <Button label='2' click={addDigit} />
                <Button label='3' click={addDigit} />
                <Button label='+' operation click={setOperation} />
                <Button label='0' double click={addDigit} />
                <Button label='.' click={addDigit} />
                <Button label='=' operation click={setOperation} />
            </div>
        )
    }
}