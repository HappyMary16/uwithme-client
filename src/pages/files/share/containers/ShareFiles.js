import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreatableSelect from 'react-select/creatable';
import Container from 'react-bootstrap/Container';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import i18n from '../../../../locales/i18n';
import { getLectures, getTasks } from '../../../../utils/FileUtil';
import { compose } from 'redux';
import FilesToChoose from '../components/FilesToChoose';
import { SelectField } from '../../../../common/components/SelectField';
import { addAccessToFiles } from '../actions';
import { loadGroups } from '../../../../common/actions';
import { getFilesByUsername, loadSubjects } from '../../actions';

const submit = {
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: '0px',
  backgroundColor: '#eeeeee'
};

const groupSelect = {
  marginTop: '20px'
};

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#483D8B',
    primary50: '#D3D3D3',
    primary25: '#F5F5F5'
  }
});

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
    const { dispatch, username } = this.props;
    dispatch(loadGroups());
    dispatch(loadSubjects(username));

    if (this.props.subjects) {
      this.props.subjects.forEach(subject => {
        dispatch(getFilesByUsername(username, subject.id));
      });
    }
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
          <Container>
            <SelectField
              label={i18n.t('subject')}
              values={subjects.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })}
              onChange={s => {
                this.setState({
                  subjectId: s
                });
              }}
            />
          </Container>
        </Grid>
        <Container>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{i18n.t('lecture')}</FormLabel>
                <FilesToChoose
                  files={lectures.filter(
                    lecture => lecture.subjectId === subjectId
                  )}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{i18n.t('task')}</FormLabel>
                <FilesToChoose
                  files={tasks.filter(task => task.subjectId === subjectId)}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Container>

        <Container style={groupSelect}>
          <CreatableSelect
            theme={theme}
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
    groups: state.infoReducers.groups
  };
};

export default compose(connect(mapStateToProps))(ShareFiles);
