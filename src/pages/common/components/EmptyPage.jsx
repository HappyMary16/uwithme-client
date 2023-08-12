import {Row} from 'react-bootstrap';
import {Fragment} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function EmptyPage({message, linkText, href, list, isFetching}) {

  const {t} = useTranslation();

  return (
    <Fragment>
      {!list?.length && !isFetching && (
        <Row className="justify-content-center">
          <h5 className="text-center">{message ?? t('there_is_no_data')}</h5>
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
