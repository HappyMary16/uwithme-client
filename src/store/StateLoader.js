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
      authorization: {
        user: {},
        token: null
      },
      info: {
        institutes: [
          {
            value: '1',
            label: 'I'
          },
          {
            value: '2',
            label: 'KIT'
          }
        ],
        departments: [
          {
            value: '1',
            label: 'd1'
          },
          {
            value: '2',
            label: 'd2'
          }
        ],
        groups: [
          {
            value: '1',
            label: 'i-26b'
          },
          {
            value: '2',
            label: 'i-26a'
          }
        ]
      }
    };
  }
}
