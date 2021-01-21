import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function counterReducer(state = { count: 0, numberOfViews: 10 }, action) {
  console.log('** counterReducer was called **');
  switch (action.type) {
    case 'counter/increment':
      console.log('about to increment counter');
      return { ...state, count: state.count + 1 };
    case 'counter/decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function userReducer(state = { name: '', email: '', username: '' }, action) {
  console.log('** userReducer was called **');
  switch (action.type) {
    case 'SET_NAME':
      console.log('about to set name to ', action.payload);
      return { ...state, name: action.payload };
    case 'SET_USERNAME':
      console.log('about to set username to ', action.payload);
      return { ...state, username: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

const action = { type: 'SET_NAME', payload: 'Zeyana' };

const store = createStore(counterReducer);

// console.log('state: ', store.getState());

// store.dispatch({ type: 'counter/increment' });

// console.log('!! updated state: ', store.getState());

const Counter = () => {
  const [counter, setCounter] = useState(store.getState().count);

  // store.subscribe(() => console.log('!! updated state: ', store.getState()));
  store.subscribe(() => setCounter(store.getState().count));

  return (
    <View style={styles.container}>
      <Text>Counter: {store.getState().count}</Text>
      <Button
        title="Increment"
        onPress={() => store.dispatch({ type: 'counter/increment' })}
      />
    </View>
  );
};

// const userStore = createStore(userReducer);

const UserDetailsExample = () => {
  let name = '';
  let username = '';
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter name"
        onChangeText={(value) => (name = value)}
      />
      <Text>Name: {userStore.getState().name}</Text>
      <Button
        title="Set name"
        onPress={() => userStore.dispatch({ type: 'SET_NAME', payload: name })}
      />
      <TextInput
        placeholder="Enter username"
        onChangeText={(value) => (username = value)}
      />
      <Button
        title="Set username"
        onPress={() =>
          userStore.dispatch({ type: 'SET_USERNAME', payload: username })
        }
      />
    </View>
  );
};

const ChildComponent = () => {
  const count = useSelector((state) => state.data);

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};

const ReactReduxApp = () => {
  // const count = useSelector((state) => state.count);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Text>Counter: {count}</Text>
      <Button
        title="Increment"
        onPress={() => dispatch({ type: 'counter/increment' })}
      />
      <Button
        title="Decrement"
        onPress={() => dispatch({ type: 'counter/decrement' })}
      />
      <ChildComponent />
    </View>
  );
};

/* Multiple reducers example */

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});
const multipleReducersStore = createStore(rootReducer);

const ReactReduxExample = () => {
  return (
    // <Provider store={store}>
    <Provider store={multipleReducersStore}>
      <ReactReduxApp />
    </Provider>
  );
};

export default function App() {
  // return <Counter />;
  // return <UserDetailsExample />;
  return <ReactReduxExample />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
