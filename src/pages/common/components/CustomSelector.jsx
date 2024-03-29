import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {Form} from 'react-bootstrap';

export function CustomSelector({isEditMode = true, options, value, onChange}) {
  return (
    <div>
      {isEditMode && (
        <Select
          className={'selector'}
          theme={selectorColors}
          options={options}
          value={value}
          onChange={onChange}
        />
      )}
      {!isEditMode && (
        <Form.Control value={value && value.label} readOnly={true} />
      )}
    </div>
  );
}
