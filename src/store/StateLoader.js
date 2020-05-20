export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem('http://education-app.com:state');

      return JSON.parse(serializedState ? serializedState : {});
    } catch (err) {
      return {};
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem('http://education-app.com:state', serializedState);
    } catch (err) {}
  }
}
