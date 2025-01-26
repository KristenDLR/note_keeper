import { ColorSchemeToggle } from '../../components/colorSchemeToggle/colorSchemeToggle.component';
import { Welcome } from '../../components/welcome/welcome.component';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
};

export default HomePage;