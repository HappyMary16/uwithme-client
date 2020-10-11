import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import i18n from '../../../../locales/i18n';
import { getLectures, getTasks } from '../../../../utils/FileUtil';
import { compose } from 'redux';
import FilesToChoose from '../components/FilesToChoose';
import { addAccessToFiles } from '../actions';
import { loadSubjectsAndFiles } from '../../actions';
import Select from 'react-select';
import { marginTop, selectorColors } from '../../../../common/styles/styles';
import Container from '@material-ui/core/Container';
import { loadGroupsByTeacher } from '../../../groups/actions';

const submit = {
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: '0px',
  backgroundColor: '#eeeeee'
};

let selectedGroups = [];
let files = [];

class ShareFiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: ''
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadGroupsByTeacher());
    dispatch(loadSubjectsAndFiles());
  }

  submit() {
    const { dispatch } = this.props;
    dispatch(
      addAccessToFiles(
        files,
        selectedGroups.map(group => group.value)
      )
    );
    files = [];
    selectedGroups = [];
  }

  handleChange(value, file) {
    if (files.includes(file)) {
      files.filter(f => f !== file);
    } else {
      files.push(file);
    }
  }

  handleGroupChange(value) {
    selectedGroups = value;
  }

  render() {
    const { lectures, tasks, groups, subjects } = this.props;
    const { subjectId } = this.state;

    return (
      <Grid xs={12} alignItems={'center'}>
        <Grid item xs={12}>
          <Container style={marginTop}>
            <Select
              theme={selectorColors}
              onChange={opinion => this.setState({ subjectId: opinion.value })}
              options={subjects.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })}
              placeholder={i18n.t('subject')}
            />
          </Container>
        </Grid>
        <Container>
          <Grid container xs={12} style={marginTop}>
            <Grid item xs={6}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{i18n.t('lecture')}</FormLabel>
                <FilesToChoose
                  files={lectures.filter(
                    lecture => lecture.subjectId === subjectId
                  )}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{i18n.t('task')}</FormLabel>
                <FilesToChoose
                  files={tasks && tasks.filter(task => task.subjectId === subjectId)}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Container>

        <Container style={marginTop}>
          <Select
            placeholder={i18n.t('groups')}
            theme={selectorColors}
            isMulti
            onChange={this.handleGroupChange}
            options={groups}
          />
        </Container>

        <Container>
          <Grid container alignItems={'right'}>
            <Button
              type='submit'
              color='primary'
              variant='outlined'
              style={submit}
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
    username: state.authReducers.user.username,
    subjects: state.filesReducers.subjects,
    lectures: getLectures(state.filesReducers.files),
    tasks: getTasks(state.filesReducers.files),
    groups: state.adminReducers.groups
  };
};

export default compose(connect(mapStateToProps))(ShareFiles);
