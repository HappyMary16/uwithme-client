import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import i18n from '../../../locales/i18n';
import {AddLectureHall} from './components/AddLectureHall';
import {BuildingsList} from './components/BuildingsList';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {selectApiLoading} from "../../../App";
import {useFetchLectureHallsQuery} from "../../../store/lecturehall/lectureHallApiSlice";
import {useFetchBuildingsQuery} from "../../../store/lecturehall/buildingApiSlice";

export default function LectureHalls() {

  const {data: lectureHalls} = useFetchLectureHallsQuery();
  const {data: buildings} = useFetchBuildingsQuery();

  const isFetching = useSelector(selectApiLoading);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

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
          {openCreateDialog && <AddLectureHall handleClose={() => setOpenCreateDialog(false)}/>}
        </Col>
      </Row>

      <EmptyPage list={buildings} isFetching={isFetching}/>

      <BuildingsList buildings={buildings} lectureHalls={lectureHalls}/>
    </Container>
  );
}
