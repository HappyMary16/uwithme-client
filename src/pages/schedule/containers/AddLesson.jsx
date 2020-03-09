import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import i18n from '../../../locales/i18n';
import {
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../../../common/actions';
import { SelectField } from '../../../common/components/SelectField';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import { selectorColors } from '../../../common/styles/styles';

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
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  groupSelect: {
    marginTop: '20px'
  },
  submit: {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: '0px',
    backgroundColor: '#eeeeee'
  }
});

class AddLesson extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.someAction = this.someAction.bind(this);
    this.instituteHandleClick = this.instituteHandleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadInstitutesByUniversityId(universityId));
      dispatch(loadDepartmentsByUniversityId(universityId));
      dispatch(loadGroupsByUniversityId(universityId));

      //TODO
      // load teachers by university id
      // load subjects by university id
      // load auditory by university id
      // load lessons time (feature)
    }
  }

  instituteHandleClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { teachers, lectureHalls, groups, subjects, classes } = this.props;
    const { subjectId } = this.state;

    return (
      <Grid xs={12} alignItems={'center'}>
        <Container>
          <SelectField
            label={i18n.t('subject')}
            values={
              subjects &&
              subjects.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })
            }
            onChange={s => {
              this.setState({
                subjectId: s
              });
            }}
          />
        </Container>

        <Container>
          <SelectField
            label={i18n.t('subject')}
            values={
              teachers &&
              teachers.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })
            }
            onChange={s => {
              this.setState({
                teacher: s
              });
            }}
          />
        </Container>

        <Container>
          <SelectField
            label={i18n.t('subject')}
            values={
              lectureHalls &&
              lectureHalls.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })
            }
            onChange={s => {
              this.setState({
                teacher: s
              });
            }}
          />
        </Container>

        <Container className={classes.groupSelect}>
          <Select
            theme={selectorColors}
            isMulti
            onChange={this.handleGroupChange}
            options={groups}
          />
        </Container>

        <Container>
          <Grid container alignItems={'right'}>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.submit}
              onClick={this.submit}
            >
              {i18n.t('upload')}
            </Button>
          </Grid>
        </Container>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups,
    universityId: state.authReducers.user.universityId
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddLesson);
