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
  Title
} from '@mantine/core';
import { logo } from 'assets';
import { useUserAuth } from 'context/userAuthContext';
import { useState } from 'react';
import { CiAt } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from 'supabase/client';
import { UserLogIn } from 'types';
import classes from './Login.module.css';

interface ILoginProps { }

const initialValues: UserLogIn = {
  email: '',
  password: '',
  loading: false,
  error: '',
};

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [userLoginInfo, setUserLoginInfo] = useState<UserLogIn>(initialValues);
  const { session, login } = useUserAuth();
  const navigate = useNavigate();

  console.log('session', session)


  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // or your site's URL
      },
    });

    if (error) console.error('Google Sign-In Error:', error);
    console.log("google login")
  };

  const handleLogin = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserLoginInfo({ ...userLoginInfo, loading: true })
    try {
      console.log('The user info is: ', userLoginInfo);
      const result = await login(userLoginInfo.email, userLoginInfo.password);
      if (result.success) {
        navigate('/profile');
      }
    } catch (error) {
      setUserLoginInfo({ ...userLoginInfo, error: "An error occured when signing up" })
      console.log('Error: ', error);
    } finally {
      setUserLoginInfo({ ...userLoginInfo, loading: false });
    }
  };

  return (
    <form onSubmit={handleLogin}>

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
                w={'200px'}
                className={classes.googleBtn}
                variant="outline"
                radius="xl"
                onClick={handleGoogleSignUp}
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
