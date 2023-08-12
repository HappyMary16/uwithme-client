import {useDispatch, useSelector} from 'react-redux';
import {ErrorMessage} from './components/ErrorMessage';
import {errorRemoved, selectErrors} from "../../store/message/messageSlice";

export default function ErrorContainer() {

  const dispatch = useDispatch();

  const errors = useSelector(selectErrors);

  function closeMessage(errorId) {
    dispatch(errorRemoved(errorId));
  }

  return (
    <div>
      {Array.isArray(errors) && errors.map((error, i) => (
        <ErrorMessage
          key={i}
          error={error}
          handleClose={closeMessage}
        />
      ))}
    </div>
  );
}
