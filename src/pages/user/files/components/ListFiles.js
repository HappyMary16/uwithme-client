import React from 'react';
import {isPossibleToOpen} from '../../../../utils/FileUtil';
import {Col, Collapse, ListGroup, Row} from 'react-bootstrap';
import {ArrowDownCircleFill, BookHalf, FileEarmarkRichtextFill, TrashFill} from 'react-bootstrap-icons';
import {useFileDownloader} from "../../../../hooks/useFileDownloader";
import {useDeleteFileMutation} from "../../../../store/file/fileApiSlice";

export default function ListFiles({open, files}) {

  const downloadFile = useFileDownloader();
  const [deleteFile] = useDeleteFileMutation();

  return (
    <Collapse in={open}>
      <ListGroup>
        {files.map((file, i) => (
          <ListGroup.Item className={"padding-left-x2"} action key={i}>
            <Row className={"show-grid"}>
              <Col xs={2} sm={1}>
                <Row className="justify-content-center">
                  <FileEarmarkRichtextFill className={"icon-color"} size={22}/>
                </Row>
              </Col>
              <Col xs={6} sm={8} md={9}>
                {file.name}
              </Col>
              <Col xs={4} sm={3} md={2}>
                <Row className="justify-content-end">
                  {isPossibleToOpen(file.name) && (
                    <BookHalf
                      className={"icon"}
                      size={22}
                      onClick={() => downloadFile(file.id, file.name, false)}
                    />
                  )}
                  <ArrowDownCircleFill
                    className={"icon"}
                    size={22}
                    onClick={() => downloadFile(file.id, file.name, true)}
                  />
                  <TrashFill
                    onClick={() => deleteFile(file.id)}
                    className={'delete-icon icon'}
                    size={'1.4em'}
                  />
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
}
