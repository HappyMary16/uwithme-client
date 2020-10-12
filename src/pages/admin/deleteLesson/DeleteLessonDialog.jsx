import React from 'react';
import i18n from '../../../locales/i18n';
import { selectorColors } from '../../../common/styles/styles';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const DeleteLessonDialog = ({ open, lesson, handleClose, handleDelete }) => {
  const [choseGroups, setChoseGroups] = React.useState(lesson.groups);
  const groups = lesson.groups.map(group => {
    return {
      value: group,
      label: group
    };
  });

  let onDelete = () => {
    handleDelete(choseGroups);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('choose_groups_for_which_you_want_to_delete_lesson')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Select
          placeholder={i18n.t('select_group')}
          theme={selectorColors}
          isMulti
          options={groups}
          defaultValue={groups}
          onChange={(e) => setChoseGroups(e.map(group => group.value))}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={onDelete} variant={'purple'}>
          {i18n.t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
