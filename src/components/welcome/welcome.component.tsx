import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { ActionIcon, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { auth } from '../../firebase/firebase.config';
import classes from './welcome.module.css';

export function Welcome() {

  const handleGoogleSignIn = async() => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };


  return (
    <>
      <Stack>
        <Title className={classes.title} ta="center" mt={100}>
          Welcome to{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Note Keeper
          </Text>
        </Title>
        <Group justify="center">
          <Stack>
            <TextInput />
            <TextInput />
          </Stack>
          <ActionIcon
            className={classes.googleBtn}
            variant="gradient"
            onClick={handleGoogleSignIn}
            aria-label="Sign in with Google"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            <Text pr="10px">Log in with </Text>
            <FcGoogle />
            oogle
          </ActionIcon>
        </Group>
      </Stack>
    </>
  );
}
