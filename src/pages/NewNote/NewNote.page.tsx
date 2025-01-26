import { Container, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../../components/colorSchemeToggle/colorSchemeToggle.component';
import { NoteForm } from '../../components/noteForm/noteForm.component';

interface INewNoteProps {}

const NewNote: React.FunctionComponent<INewNoteProps> = () => {
  return (
    <>
      <ColorSchemeToggle />
      <Container>
        <Title> New Note</Title>
        <NoteForm />
      </Container>
    </>
  );
};

export default NewNote;
