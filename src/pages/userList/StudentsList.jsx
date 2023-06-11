import {useSelector} from 'react-redux';
import {UsersList} from './components/UsersList';
import {STUDENT} from '../../constants/userRoles';
import {selectApiLoading} from "../../App";
import {useFetchUsersQuery} from "../../store/user/userApiSlice";

export default function StudentsList() {

  const {data: users} = useFetchUsersQuery({role: STUDENT});

  const isFetching = useSelector(selectApiLoading);

  return (
    <UsersList users={users} isFetching={isFetching}/>
  );
}
