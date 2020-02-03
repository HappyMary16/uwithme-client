import { LECTURE, TASK } from '../common/constants/userRoles';

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
      filesReducers: {
        subjects: [
          {
            id: 1,
            name: 'Subject 1'
          },
          {
            id: 2,
            name: 'Subject 2'
          },
          {
            id: 3,
            name: 'Subject 3'
          }
        ],
        files: [
          {
            name: 'Task 1',
            subjectId: 1,
            type: TASK
          },
          {
            name: 'Lecture 1',
            subjectId: 1,
            type: LECTURE
          },
          {
            name: 'Task 1',
            subjectId: 2,
            type: TASK
          },
          {
            name: 'Task 2',
            subjectId: 2,
            type: TASK
          },
          {
            name: 'Lecture 2',
            subjectId: 1,
            type: LECTURE
          }
        ]
      }
    };
  }
}
