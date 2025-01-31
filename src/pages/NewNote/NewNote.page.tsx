import { Container, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../../components/colorSchemeToggle/colorSchemeToggle.component';
import { NoteForm } from '../../components/noteForm/noteForm.component';
import { NoteData, Tag } from 'types';

interface INewNoteProps {
 onSubmit: (data: NoteData) => void;
 onAddTag: (tag: Tag) => void;
 availableTags: Tag[];
}

const NewNote: React.FunctionComponent<INewNoteProps> = (props) => {
  const { onSubmit, onAddTag, availableTags } = props;

  return (
    <>
      <ColorSchemeToggle />
      <Container>
        <Title> New Note</Title>
        <NoteForm onSubmit ={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
      </Container>
    </>
  );
};

export default NewNote;
