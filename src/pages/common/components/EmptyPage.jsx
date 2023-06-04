import i18n from '../../../config/i18n';
import {Row} from 'react-bootstrap';
import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

export function EmptyPage({message, linkText, href, list, isFetching}) {
  return (
    <Fragment>
      {!list?.length && !isFetching && (
        <Row className="justify-content-center">
          <h5 className="text-center">{message ?? i18n.t('there_is_no_data')}</h5>
          {href && linkText && (
            <Link to={href}>
              <h5>{linkText}</h5>
            </Link>
          )}
        </Row>
      )}
    </Fragment>
  );
}
