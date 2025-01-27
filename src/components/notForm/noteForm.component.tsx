import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { Box, Button, Group, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export function NoteForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      tags: '',
      body: '',
    },

    validate: {
      title: (value) => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      body: (value) => (value.length < 1 ? 'Note empty' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Title>Form</Title>
      <Group grow>
        <TextInput
          withAsterisk
          label="Title"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <Box>
          <Text>Tags</Text>
          <CreatableReactSelect isMulti key={form.key('tags')} />
        </Box>
      </Group>
      <Textarea
        required
        key={form.key('body')}
        label="Body"
        placeholder="..."
        minRows={15}
        autosize
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Save</Button>
        <Link to="..">
          <Button variant="light" type="button">
            Cancel
          </Button>
        </Link>
      </Group>
    </form>
  );
}
