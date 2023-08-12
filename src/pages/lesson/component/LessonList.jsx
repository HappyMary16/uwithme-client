import {Collapse, ListGroup} from 'react-bootstrap';
import {getGroupList, getLessonTime} from '../../../utils/ScheduleUtil';
import {ListItem} from '../../common/components/ListItem';
import {TEACHER} from '../../../constants/userRoles';
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../../store/user/authSlice";

export function LessonList({ lessons, open, user, isEditMode, deleteLesson }) {
  const activeRole = useSelector(selectActiveRole);

  return (
    <Collapse in={open}>
      <ListGroup variant={'flush'}>
        {lessons?.map((lesson, i) => (
          <ListGroup.Item key={i} className={'padding-left-x2'}>
            <ListItem openEnabled={false}
                      icon={getLessonTime(lesson.lessonTime)}
                      text={lesson.subjectName + ' (' + (!user && activeRole === TEACHER ? getGroupList(lesson.groups) : lesson.teacherName) + ')'}
                      secondaryText={lesson.lectureHall + ' ' + lesson.building}
                      isDeletePresent={isEditMode}
                      deleteFunc={deleteLesson}
                      deleteFuncParam={lesson}/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
}