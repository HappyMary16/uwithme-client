export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem(
        //this.initializeState()
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
      authReducers: {
        user: {},
        token: null
      },
      infoReducers: {
        institutes: [
          {
            value: '1',
            label: 'TEST'
          }
        ],
        departments: [
          {
            value: '1',
            label: 'test'
          }
        ],
        groups: [
          {
            value: '1',
            label: 'test-group'
          }
        ],
        scienceDegrees: [
          {
            value: '1',
            label: 'Doctor'
          },
          {
            value: '2',
            label: 'Docent'
          }
        ]
      },
      userReducers: {
        type: 'STUDENT',
        subjects: []
      },
      filesReducers: {
        files: [
          {
            subjectName: 'History',
            lectures: [
              {
                name: 'First',
                link: 'link1'
              },
              {
                name: 'Second',
                link: 'link2'
              }
            ],
            tasks: [
              {
                name: 'First',
                link: 'link1'
              },
              {
                name: 'Second',
                link: 'link2'
              }
            ]
          },
          {
            subjectName: 'Math',
            lectures: [
              {
                name: 'First',
                link: 'link1'
              },
              {
                name: 'Second',
                link: 'link2'
              }
            ],
            tasks: [
              {
                name: 'First',
                link: 'link1'
              },
              {
                name: 'Second',
                link: 'link2'
              }
            ]
          },
          {
            subjectName: 'Programming',
            lectures: [
              {
                name: 'Programming First',
                link: 'Programming link1'
              },
              {
                name: 'Programming Second',
                link: 'Programming link2'
              }
            ],
            tasks: [
              {
                name: 'Programming Task First',
                link: 'Programming link1'
              },
              {
                name: 'Programming Second',
                link: 'Programming link2'
              }
            ]
          }
        ]
      }
    };
  }
}
