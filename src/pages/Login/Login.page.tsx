import { useState } from 'react';
import { logo } from 'assets';
import { useUserAuth } from 'context/userAuthContext';
import { CiAt } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import { UserLogIn } from 'types';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface ILoginProps {}

const initialValues: UserLogIn = {
  email: '',
  password: '',
};

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [userLoginInfo, setUserLoginInfo] = useState<UserLogIn>(initialValues);
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault;
    try {
      await googleSignIn();
      navigate('/new');
    } catch (error) {
      console.log('Error: ', error);
    }
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault;
    try {
      console.log('The user info is: ', userLoginInfo);
      await logIn(userLoginInfo.email, userLoginInfo.password);
      navigate('/');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <Box>
              <ActionIcon
                className={classes.googleBtn}
                variant="outline"
                radius="xl"
                onClick={handleGoogleSignIn}
                aria-label="Sign in with Google"
                //   gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
              >
                <FcGoogle />
                <Text p="10px">Log in with Google</Text>
              </ActionIcon>
            </Box>
            <div className={classes.or}>or</div>
            <Stack>
              <TextInput
                id="email"
                type="email"
                value={userLoginInfo.email}
                radius="xl"
                width="xl"
                rightSectionPointerEvents="none"
                rightSection={<CiAt size={16} />}
                label="Your email"
                placeholder="Your email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLoginInfo({ ...userLoginInfo, email: event.target.value })
                }
              />
              <TextInput
                id="password"
                type="password"
                value={userLoginInfo.password}
                radius="xl"
                width="xl"
                label="Password"
                placeholder="Password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLoginInfo({ ...userLoginInfo, password: event.target.value })
                }
              />
              <Button type="submit" radius="xl" variant="filled">
                Log in
              </Button>
              <Text>Don't have an account? <Link to='/signup'>Sign Up</Link></Text>
            </Stack>
          </Stack>
        </Grid.Col>
        <Grid.Col className={classes.imgOfNotes} span={6}>
          <Container fluid h={50} className={classes.containerBorder}>
            <div>Image of notes</div>
          </Container>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default Login;
