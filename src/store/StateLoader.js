export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem(
        'http://education-app.com:state'
      );

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem('http://education-app.com:state', serializedState);
    } catch (err) {}
  }

  initializeState() {
    return {
      user: {},
      toDoList: [],
      token: null
    };
  }
}
