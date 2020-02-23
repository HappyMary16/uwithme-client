import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

class FilesToChoose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { files, onChange } = this.props;

    return (
      <FormGroup>
        {files.map((file, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                color="primary"
                onChange={e => onChange(e, file.id)}
                value={file.id}
              />
            }
            label={file.name}
          />
        ))}
      </FormGroup>
    );
  }
}

export default FilesToChoose;
