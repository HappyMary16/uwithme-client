import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Institute from './components/Institute';
import {CreateStructurePanel} from './components/CreatingStructurePanel';
import {Container, ListGroup} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {loadGroupsByUniversityId} from '../../../actions/groupActions';
import {useFetchUserQuery} from "../../../store/auth/authApiSlice";
import {selectApiLoading} from "../../../App";
import {useFetchDepartmentsByUniversityIdQuery} from "../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function UniversityStructure() {

  const dispatch = useDispatch();

  const universityId = useFetchUserQuery().data?.universityId;
  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);
  const {data: departments} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);
  const groups = useSelector(state => Object.values(state.groupReducers.groups));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  useEffect(() => {
    if (universityId) {
      dispatch(loadGroupsByUniversityId(universityId));
    }
  }, [universityId, dispatch]);

  return (
    <Container>
      <CreateStructurePanel/>

      <EmptyPage list={institutes} isFetching={isFetching || isNewFetching}/>

      <ListGroup variant="flush">
        {institutes &&
          institutes.map((institute, i) => (
            <Institute
              key={i}
              institute={institute}
              groups={groups}
            />
          ))}
      </ListGroup>
    </Container>
  );
}
