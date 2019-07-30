import React, { Component } from 'react';
import {connect} from "react-redux";

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from "../../store/actions";

class Counter extends Component {
    state = {
        counter: 0
    };

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } );
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } );
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } );
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } );
                break;
        }
    };

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult =>(
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

//instructions how state managed by redux should be map to props that you can use in this container
//because now redux is managing the state, we map redux state to props and we can change it from outside

//pobraliśmy stan z reduxa i podpieliśmy pod ctr którego możemy użyć w komponencie

const mapStateToProps = state => {
  return {
      ctr: state.ctr.counter,
      storedResults: state.res.results
  }
};

//Wysyłanie akcji z komponentu
const mapDispatchToProps = dispatch => {
  return {
      //metoda którą przekazujemy
      onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
      onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
      onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
      onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
      onStoreResult: (result) => dispatch ({type: actionTypes.STORE_RESULT, result: result}),
      onDeleteResult: (id) => dispatch ({type: actionTypes.DELETE_RESULT, resultId: id})

  };
};
//in connect we describe 2 things:
// witch part od application state we want to get
// witch actions we want to dispatch
export default connect(mapStateToProps, mapDispatchToProps)(Counter);