import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Institute from './components/Institute';
import {getDepartmentsByInstitute} from '../../../utils/StructureUtils';
import {CreateStructurePanel} from './components/CreatingStructurePanel';
import {Container, ListGroup} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {loadInstitutesByUniversityId} from '../../../actions/instituteActions';
import {loadDepartmentsByUniversityId} from '../../../actions/departmentActions';
import {loadGroupsByUniversityId} from '../../../actions/groupActions';
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";
import {selectApiLoading} from "../../../App";

export default function UniversityStructure() {

  const dispatch = useDispatch();

  const universityId = useFetchUserQuery().data.universityId;
  const institutes = useSelector(state => Object.values(state.instituteReducers.institutes));
  const departments = useSelector(state => Object.values(state.departmentReducers.departments));
  const groups = useSelector(state => Object.values(state.groupReducers.groups));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  useEffect(() => {
    if (universityId) {
      dispatch(loadInstitutesByUniversityId());
      dispatch(loadDepartmentsByUniversityId());
      dispatch(loadGroupsByUniversityId(universityId));
    }
  }, [universityId, dispatch]);

  return (
    <Container>
      <CreateStructurePanel institutes={institutes} departments={departments}/>

      <EmptyPage list={institutes} isFetching={isFetching || isNewFetching}/>

      <ListGroup variant="flush">
        {institutes &&
          institutes.map((institute, i) => (
            <Institute
              key={i}
              institute={institute}
              departments={getDepartmentsByInstitute(departments, institute)}
              groups={groups}
            />
          ))}
      </ListGroup>
    </Container>
  );
}
