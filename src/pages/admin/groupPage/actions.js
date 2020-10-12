import { RENDER_GROUPS } from '../structure/actions';

export const LOAD_GROUPS_BY_TEACHER = 'LOAD_GROUPS_BY_TEACHER';

export const loadGroupsByTeacher = () => ({
  type: LOAD_GROUPS_BY_TEACHER
});

export const renderGroups = groups => ({
  type: RENDER_GROUPS,
  payload: {
    groups
  }
});
