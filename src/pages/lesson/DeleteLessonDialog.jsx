import i18n from '../../config/i18n';
import {selectorColors} from '../../styles/styles';
import Select from 'react-select';
import {Button, Modal} from 'react-bootstrap';
import {useState} from "react";

export function DeleteLessonDialog({open, lesson, handleClose, handleDelete}) {
  const [choseGroups, setChoseGroups] = useState(lesson.groups);
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
        <Modal.Title>
          {i18n.t('choose_groups_for_which_you_want_to_delete_lesson')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Select
          placeholder={i18n.t('select_group')}
          theme={selectorColors}
          isMulti
          options={groups}
          defaultValue={groups}
          onChange={e => {
            if (!e) {
              setChoseGroups([]);
            } else {
              setChoseGroups(e.map(group => group.value));
            }
          }}
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
}
