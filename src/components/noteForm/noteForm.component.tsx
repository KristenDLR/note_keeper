import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from 'types';
import { Box, Button, Group, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuidV4 } from 'uuid';

export interface INoteForm {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export const NoteForm: React.FunctionComponent<INoteForm> = (props) => {
  const { onSubmit, onAddTag, availableTags } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });
    navigate("..")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>Title</Title>
      <Group grow>
        <TextInput
          withAsterisk
          required
          ref={titleRef}
          label="Title"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <Box>
          <Text>Tags</Text>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            options={availableTags.map(tag => {
              return { label: tag.label, value: tag.id }
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
            key={form.key('tags')}
          />
        </Box>
      </Group>
      <Textarea
        required
        ref={bodyRef}
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
};
