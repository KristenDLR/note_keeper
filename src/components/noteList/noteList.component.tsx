import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { CardNote, Tag } from 'types';
import { Box, Button, Container, Flex, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import { NoteCard } from 'components/noteCard/noteCard.component';

export interface INoteList {
  availableTags: Tag[];
  notes: CardNote[];
}

export const NoteList: React.FunctionComponent<INoteList> = (props) => {
  const { availableTags, notes } = props;
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);


  return (
    <Container>
      <Flex gap="lg" direction="row" justify="center" align="center" wrap="nowrap">
        <Title>Notes</Title>
        <Group justify="space-between">
          <Link to="/new">
            <Button variant="solid"> Create</Button>
          </Link>
          <Button variant="outline"> Edit Tags</Button>
        </Group>
      </Flex>
      <form>
        <Title>Title</Title>
        <Group grow>
          <TextInput
            //   ref={titleRef}
            label="Title"
            //   key={form.key('title')}
            //   {...form.getInputProps('title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box>
            <Text>Tags</Text>
            <ReactSelect
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </Box>
        </Group>
      </form>
      <Grid mt="20px">
        {filteredNotes.map((note) => {
          return (
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }} key={note.id}>
              <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};



