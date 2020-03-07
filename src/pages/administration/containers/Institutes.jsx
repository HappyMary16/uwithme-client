import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { ADD_INSTITUTE } from '../../../common/constants/links';
import i18n from '../../../locales/i18n';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { loadInstitutesByUniversityId } from '../../../common/actions';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  link: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: '#eeeeee'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  }
});

class Institutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.someAction = this.someAction.bind(this);
    this.instituteHandleClick = this.instituteHandleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    universityId && dispatch(loadInstitutesByUniversityId(universityId));
  }

  instituteHandleClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { institutes, classes } = this.props;
    const { open } = this.state;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container xs={6} className={classes.buttons} justify="flex-end">
          <Button
            href={ADD_INSTITUTE}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            {i18n.t('add_institute')}
          </Button>
        </Grid>
        <List component="nav" className={classes.list}>
          {institutes &&
            institutes.map((institute, i) => (
              <ListItem key={i} button onClick={this.instituteHandleClick}>
                <ListItemText primary={institute.label} />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.someAction}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={this.someAction}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton onClick={this.someAction}>
                    <DeleteIcon />
                  </IconButton>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    institutes: state.infoReducers.institutes,
    universityId: state.authReducers.user.universityId
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(Institutes);
