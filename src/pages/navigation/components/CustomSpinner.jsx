import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

export function CustomSpinner({ isFetching }) {
  return (
    <div>
      {!!isFetching && (
        <div className="modal-backdrop custom-spinner-modal">
          <Row className={'justify-content-center'}>
            <Spinner animation="border" variant="light" className={'spinner'} />
          </Row>
        </div>
      )}
    </div>
  );
}
