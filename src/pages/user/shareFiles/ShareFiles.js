import React from "react";
import { connect } from "react-redux";
import i18n from "../../../locales/i18n";
import { getLectures, getTasks } from "../../../utils/FileUtil";
import { compose } from "redux";
import Select from "react-select";
import { selectorColors } from "../../../styles/styles";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { SubjectFiles } from "./components/SubjectFiles";
import { EmptyPage } from "../../common/components/EmptyPage";
import { ADD_FILE } from "../../../constants/links";
import { loadGroupsByTeacher } from "../../../actions/groupActions";
import {
  addAccessToFiles,
  loadSubjectsAndFiles
} from "../../../actions/fileActions";

let selectedGroups = [];
let files = [];

class ShareFiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: ""
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
    const { lectures, tasks, groups, subjects, isFetching } = this.props;
    const { subjectId } = this.state;

    return (
      <div>
        <EmptyPage
          message={i18n.t("you_do_not_have_any_file")}
          href={ADD_FILE}
          linkText={"add_files_page"}
          list={subjects}
          isFetching={isFetching}
        />

        {subjects && subjects.length > 0 && (
          <div>
            <Select
              className={"selector"}
              theme={selectorColors}
              onChange={opinion => this.setState({ subjectId: opinion.value })}
              options={subjects.map(s => {
                return {
                  value: s.id,
                  label: s.name
                };
              })}
              placeholder={i18n.t("subject")}
            />
            <SubjectFiles
              lectures={lectures}
              tasks={tasks}
              subjectId={subjectId}
              handleChoose={this.handleChange}
            />
            <Select
              className={"selector"}
              placeholder={i18n.t("groups")}
              theme={selectorColors}
              isMulti
              onChange={this.handleGroupChange}
              options={groups}
            />

            <Col
              xs={12}
              md={{ offset: 9, span: 3 }}
              lg={{ offset: 9, span: 3 }}
              xl={{ offset: 10, span: 2 }}
            >
              <Button
                block
                type={"submit"}
                variant={"purple"}
                onClick={this.submit}
              >
                {i18n.t("upload")}
              </Button>
            </Col>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducers.user.username,
    subjects: state.filesReducers.subjects,
    lectures: getLectures(state.filesReducers.files),
    tasks: getTasks(state.filesReducers.files),
    groups: state.groupReducers.groups,
    isFetching: state.navigationReducers.isFetching
  };
};

export default compose(connect(mapStateToProps))(ShareFiles);
