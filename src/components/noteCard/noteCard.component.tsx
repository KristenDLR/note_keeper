import { Link } from 'react-router-dom';
import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import classes from './noteCard.module.css';
import { CardNote } from 'types';


export const NoteCard: React.FunctionComponent<CardNote> = (props) => {
  const { id, title, tags } = props;
  
  return (
    <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.noteCard} shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Title>{title}</Title>
          {tags?.length > 0 ? (
            <Group gap='xs'>
              {tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Group>
          ) : (<></>)}
        </Stack>
      </Card>
    </Link>
  );
}
