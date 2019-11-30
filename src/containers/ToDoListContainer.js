import { connect } from 'react-redux';
import ToDoList from '../components/ToDoList';

const mapStateToProps = state => {
  return {
    toDoList: state.toDoApp.toDoList
  };
};

const ToDoListContainer = connect(mapStateToProps)(ToDoList);

export default ToDoListContainer;
