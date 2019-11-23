import { connect } from 'react-redux';
import Navigation from '../components/Navigation';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const NavigationContainer = connect(mapStateToProps)(Navigation);

export default NavigationContainer;
