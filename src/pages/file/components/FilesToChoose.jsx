import {Form} from 'react-bootstrap';

export default function FilesToChoose({label, files, onChange}) {
  return (
    <Form.Group>
      {files.length > 0 && <Form.Label>{label}</Form.Label>}
      {files.map((file, i) => (
        <Form.Check
          type={'checkbox'}
          key={i}
          onChange={e => onChange(e, file.id)}
          value={file.id}
          label={file.name}
        />
      ))}
    </Form.Group>
  );
}
