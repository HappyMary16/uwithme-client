import React from 'react';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

export const CustomSpinner = ({ isFetching }) => {
  return (
    <div>
      {isFetching !== 0 && (
        <div className="modal-backdrop">
          <Row className={'justify-content-center'}>
            <Spinner animation="border" variant="light" className={'spinner'} />
          </Row>
        </div>
      )}
    </div>
  );
};
