import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '../../../locales/i18n';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { selectorColors } from '../../../common/styles/styles';
import Select from 'react-select';

export const DeleteLessonDialog = ({ open, lesson, handleClose, handleDelete }) => {
  const [choseGroups, setChoseGroups] = React.useState(lesson.groups);
  const groups = lesson.groups.map(group => {
    return {
      value: group,
      label: group
    };
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{i18n.t('choose_groups_for_which_you_want_to_delete_lesson')}</DialogTitle>
      <DialogContent>
        <Select
          placeholder={i18n.t('select_group')}
          theme={selectorColors}
          isMulti
          options={groups}
          defaultValue={groups}
          onChange={(e) => setChoseGroups(e.map(group => group.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={() => {
          handleDelete(choseGroups);
          handleClose();
        }} color='primary'>
          {i18n.t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
