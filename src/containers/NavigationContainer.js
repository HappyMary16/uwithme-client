import { connect } from 'react-redux';
import TopToolBar from '../components/TopToolBar';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const NavigationContainer = connect(mapStateToProps)(TopToolBar);

export default NavigationContainer;
