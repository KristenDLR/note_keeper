import { logo } from 'assets';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { ActionIcon, Box, Container, Grid, Image, Stack, Text, Title } from '@mantine/core';
import classes from './SignUp.module.css';

interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const handleGoogleSignIn = async () => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <Grid>
      <Grid.Col span={6} className={classes.leftContainer}>
        <Stack>
          <Box className={classes.logoContainer}>
            <Image className={classes.logo} src={logo} />
          </Box>
          <Box>
            <Title className={classes.logoName} p="10px">
              note keeper
            </Title>

            <Text className={classes.logoName} p="10px">
              Tag It, Keep It, Love It – Your Notes, Your Way!
            </Text>
          </Box>
          <ActionIcon
            className={classes.googleBtn}
            variant="gradient"
            onClick={handleGoogleSignIn}
            aria-label="Sign in with Google"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            <FcGoogle />
            <Text p="10px">Log in with Google</Text>
          </ActionIcon>
        </Stack>
      </Grid.Col>
      <Grid.Col className={classes.imgOfNotes} span={6}>
        <Container fluid h={50} className={classes.containerBorder}>
          <div>Image of notes</div>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default SignUp;
