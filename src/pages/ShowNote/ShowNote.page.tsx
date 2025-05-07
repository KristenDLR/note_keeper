import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Note } from 'types';

export interface IShowNote {
  notes: Note[];
}

export const ShowNote: React.FunctionComponent<IShowNote> = (props) => {
  const { notes } = props;

  const {id} = useParams();
  const note = notes.find(n => n.id === id)

  if (note == null) {return <Navigate to="/" replace />
  }
  return <Outlet context={note} />

}

export function useNote() {
  return useOutletContext<Note>()
};
