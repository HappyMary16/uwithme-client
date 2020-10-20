import React from 'react';
import { loadFile } from '../actions';
import { connect } from 'react-redux';
import { isPossibleToOpen } from '../../../../utils/FileUtil';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  ArrowDownCircleFill,
  BookHalf,
  FileEarmarkRichtextFill
} from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let ListFiles = ({ open, files, dispatch }) => {
  return (
    <Collapse in={open}>
      <ListGroup>
        {files.map((file, i) => (
          <ListGroup.Item className={'padding-left-x2'} action key={i}>
            <Row className={'show-grid'}>
              <Col xs={2} sm={1}>
                <Row className="justify-content-center">
                  <FileEarmarkRichtextFill className={'icon-color'} size={22} />
                </Row>
              </Col>
              <Col xs={6} sm={8} md={9}>
                {file.name}
              </Col>
              <Col xs={4} sm={3} md={2}>
                <Row className="justify-content-end">
                  {isPossibleToOpen(file.name) && (
                    <BookHalf
                      className={'icon'}
                      size={22}
                      onClick={() =>
                        dispatch(loadFile(file.id, file.name, false))
                      }
                    />
                  )}
                  <ArrowDownCircleFill
                    className={'icon'}
                    size={22}
                    onClick={() => dispatch(loadFile(file.id, file.name, true))}
                  />
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
};

ListFiles = connect()(ListFiles);
export default ListFiles;
