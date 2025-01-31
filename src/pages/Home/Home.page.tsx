import { NoteList } from 'components/noteList/noteList';
import { ColorSchemeToggle } from '../../components/colorSchemeToggle/colorSchemeToggle.component';
import { Header } from '../../components/header/header.component';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <>
      <Header />
      <NoteList />
      <ColorSchemeToggle />
    </>
  );
};

export default HomePage;
