import {Fragment} from 'react';
import {ListGroup} from 'react-bootstrap';
import {SmallScreenDay} from './SmallScreenDay';
import {EmptyPage} from '../../common/components/EmptyPage';
import {getLocalizedWeekDays} from "../../../constants/schedule";
import {useTranslation} from "react-i18next";

export function SmallScreenSchedule({lessons, user, isEditMode, deleteLesson, weekNumber}) {

  const {t} = useTranslation();

  return (
    <Fragment>
      {lessons?.length
        ? <ListGroup variant="flush">
          {getLocalizedWeekDays(t).map((day, i) => (
            <SmallScreenDay key={i}
                            day={day}
                            lessons={lessons}
                            weekNumber={weekNumber}
                            user={user}
                            isEditMode={isEditMode}
                            deleteLesson={deleteLesson}/>))}
        </ListGroup>
        : <EmptyPage/>}
    </Fragment>
  )
}
