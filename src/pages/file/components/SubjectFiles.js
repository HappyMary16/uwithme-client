import React, {Fragment} from 'react';
import i18n from '../../../locales/i18n';
import {getLectures, getTasks} from '../../../utils/FileUtil';
import ListFiles from './ListFiles';
import {Collapse, ListGroup} from 'react-bootstrap';
import {ListItem} from '../../common/components/ListItem';
import {FolderFill} from 'react-bootstrap-icons';

export function SubjectFiles({ name, files }) {
  const [open, setOpen] = React.useState(false);
  const [lectureOpen, setLectureOpen] = React.useState(false);
  const [taskOpen, setTaskOpen] = React.useState(false);

  const subjectHandleClick = () => {
    setOpen(!open);
  };

  const lectureHandleClick = () => {
    setLectureOpen(!lectureOpen);
  };

  const taskHandleClick = () => {
    setTaskOpen(!taskOpen);
  };

  return (
    <Fragment>
      <ListGroup.Item action onClick={subjectHandleClick}>
        <ListItem
          open={open}
          text={name}
          icon={<FolderFill className={'icon-color'} />}
        />
      </ListGroup.Item>

      <Collapse in={open}>
        <ListGroup variant={'flush'}>
          <ListGroup.Item
            action
            onClick={lectureHandleClick}
            className={'padding-left'}
          >
            <ListItem
              open={lectureOpen}
              text={i18n.t('lecture')}
              icon={<FolderFill className={'icon-color'} />}
            />
          </ListGroup.Item>

          <ListFiles open={lectureOpen} files={getLectures(files)} />

          <ListGroup.Item
            action
            className={'padding-left'}
            onClick={taskHandleClick}
          >
            <ListItem
              open={taskOpen}
              text={i18n.t('task')}
              icon={<FolderFill className={'icon-color'} />}
            />
          </ListGroup.Item>

          <ListFiles open={taskOpen} files={getTasks(files)} />
        </ListGroup>
      </Collapse>
    </Fragment>
  );
}