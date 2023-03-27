import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '../../../locales/i18n';
import {AddLectureHall} from './components/AddLectureHall';
import {createLectureHall, loadBuildings, loadLectureHalls} from '../../../actions/lectureHallActions';
import {BuildingsList} from './components/BuildingsList';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";
import {selectApiLoading} from "../../../App";

export default function LectureHalls() {

  const dispatch = useDispatch();

  const universityId = useFetchUserQuery().data.universityId;
  const lectureHalls = useSelector(state => Object.values(state.lectureHallReducers.lectureHalls));
  const buildings = useSelector(state => Object.values(state.lectureHallReducers.buildings));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    if (universityId) {
      dispatch(loadBuildings());
      dispatch(loadLectureHalls());
    }
  }, [universityId, dispatch])

  return (
    <Container>
      <Row>
        <Col sm={12} md={{offset: 8, span: 4}} lg={{offset: 9, span: 3}}>
          <Button
            block
            variant={"purple"}
            onClick={() => setOpenCreateDialog(true)}
          >
            {i18n.t("create_lecture_hall")}
          </Button>
          <AddLectureHall
            open={openCreateDialog}
            handleClose={() => setOpenCreateDialog(false)}
            buildings={buildings}
            handleCreate={(buildingName, buildingId, lectureHallName, placeNumber) =>
              dispatch(createLectureHall(universityId, buildingName, buildingId, lectureHallName, placeNumber))}
          />
        </Col>
      </Row>

      <EmptyPage list={buildings} isFetching={isFetching || isNewFetching}/>

      <BuildingsList buildings={buildings} lectureHalls={lectureHalls}/>
    </Container>
  );
}
