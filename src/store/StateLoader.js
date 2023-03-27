export default class StateLoader {
  loadState(name) {
    try {
      let serializedState = localStorage.getItem('http://education-app.com:state.' + name);

      return JSON.parse(serializedState ? serializedState : {});
    } catch (err) {
      return {};
    }
  }

  saveState(name, state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem('http://education-app.com:state.' + name, serializedState);
    } catch (err) {
    }
  }
}
