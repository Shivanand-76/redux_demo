//! it is react application we have to
// import redux from 'redux'
// import { redux } from 'redux';

const redux = require('redux')
const reduxLogger = require('redux-logger');
const applyMiddlewear = redux.applyMiddleware;
const logger=reduxLogger.createLogger()
//? redux will provide the createStore() method to create the the store.
const createStore = redux.createStore;

const combinereducers=redux.combineReducers
//! first define the string constant that indicated the type of action

const BUY_CAKE = "BUY_CAKE";
const BUY_IceCream="BUY_IceCream"
//! creating the action object

// {
//     type: BUY_CAKE,
//     info:"First redux action",
// }

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function BuyIceCream() {
    return {
      type: BUY_IceCream,
      info: "First redux action",
    };
  }

//?(previousState,action)=>newstate

const initialState = {
    numOfCakes: 10,
    numOfIceCreams:10,
};

const initialCakeState = {
    numOfCakes:10
}
const initialIceCreamState = {
    numOfIceCreams:20
}

//? initialState is passed as previousState argument to the reducer function

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//           };
//           case BUY_IceCream:
//           return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1,
//           };
//     default:
//       return state;
//   }
// };


const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
      case BUY_CAKE:
        return {
          ...state,
          numOfCakes: state.numOfCakes - 1,
            };
      default:
        return state;
    }
};
  
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
      case BUY_IceCream:
        return {
          ...state,
          numOfIceCreams: state.numOfIceCreams - 1,
            };

      default:
        return state;
    }
  };
  
  
//! creating store

// const store = createStore(reducer)
//? getState() it will return the initialState state

const rootReducer = combinereducers({
    cake: cakeReducer,
    iceCream:iceCreamReducer
})
const store = createStore(rootReducer,applyMiddlewear(logger))

console.log("initialState" ,store.getState())

const unsubscribe=store.subscribe(()=>{})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(BuyIceCream())
store.dispatch(BuyIceCream())
store.dispatch(BuyIceCream())

unsubscribe();
