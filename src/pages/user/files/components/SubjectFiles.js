import React from 'react';
import i18n from '../../../../locales/i18n';
import { getLectures, getTasks } from '../../../../utils/FileUtil';
import ListFiles from './ListFiles';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { ListItem } from '../../../common/components/ListItem';
import { FolderFill } from 'react-bootstrap-icons';

export const SubjectFiles = ({ name, files }) => {
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
    <div>
      <ListGroup.Item action onClick={subjectHandleClick}>
        <ListItem
          open={open}
          text={name}
          icon={<FolderFill class={'icon-color'} />}
        />
      </ListGroup.Item>

      <Collapse in={open}>
        <ListGroup component="div" disablePadding>
          <ListGroup.Item
            action
            onClick={lectureHandleClick}
            className={'padding-left'}
          >
            <ListItem
              open={lectureOpen}
              text={i18n.t('lecture')}
              icon={<FolderFill class={'icon-color'} />}
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
              icon={<FolderFill class={'icon-color'} />}
            />
          </ListGroup.Item>

          <ListFiles open={taskOpen} files={getTasks(files)} />
        </ListGroup>
      </Collapse>
    </div>
  );
};
