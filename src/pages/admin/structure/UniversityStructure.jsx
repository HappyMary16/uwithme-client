import React from 'react';
import {useSelector} from 'react-redux';
import Institute from './components/Institute';
import {CreateStructurePanel} from './components/CreatingStructurePanel';
import {Container, ListGroup} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {useFetchUserQuery} from "../../../store/user/userApiSlice";
import {selectApiLoading} from "../../../App";
import {useFetchDepartmentsByUniversityIdQuery} from "../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {getId} from "../../../services/authService";

export default function UniversityStructure() {

  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;
  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  return (
    <Container>
      <CreateStructurePanel/>

      <EmptyPage list={institutes} isFetching={isFetching || isNewFetching}/>

      <ListGroup variant="flush">
        {institutes &&
          institutes.map((institute, i) => (
            <Institute key={i} institute={institute}/>
          ))}
      </ListGroup>
    </Container>
  );
}
