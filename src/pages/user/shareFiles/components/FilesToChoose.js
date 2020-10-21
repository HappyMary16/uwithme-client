import React from 'react';
import Form from 'react-bootstrap/Form';

class FilesToChoose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { label, files, onChange } = this.props;

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
}

export default FilesToChoose;
