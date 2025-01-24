import { Container, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NoteForm } from '@/components/NoteForm/NoteForm';

export function NewNote() {
  return (
    <>
       <ColorSchemeToggle />
      <Container>
        <Title> New Note</Title>
        <NoteForm />
      </Container>
   
    </>
  );
}
