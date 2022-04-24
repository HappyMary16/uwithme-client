import i18n from '../../../locales/i18n';
import { Row } from 'react-bootstrap';
import React from 'react';

export const EmptyPage = ({
  message = i18n.t('there_is_no_data'),
  linkText,
  href,
  list,
  isFetching
}) => {
  return (
    <Row className="justify-content-center">
      {(!list || list.length === 0) && !isFetching && (
        <div>
          <h5>{message}</h5>
          {href && linkText && (
            <link href={href}>
              <h5>{linkText}</h5>
            </link>
          )}
        </div>
      )}
    </Row>
  );
};
