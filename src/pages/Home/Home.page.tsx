import { NoteList } from 'components/noteList/noteList';
import { Note, Tag } from 'types';
import { Header } from '../../components/header/header.component';
import { Session } from '@supabase/supabase-js';

interface IHomePageProps {
  // availableTags: Tag[];
  // notes: Note[];

}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  // const { availableTags, notes, user } = props;

  return (
    <>
      <Header />
      {/* <NoteList notes={notes} availableTags={availableTags} /> */}
    </>
  );
};

export default HomePage;

