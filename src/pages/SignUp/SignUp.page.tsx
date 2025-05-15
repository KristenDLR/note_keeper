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
import { UserSignIn } from 'types';
import classes from './SignUp.module.css';

interface ISignUpProps { }

const initialValues: UserSignIn = {
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: '',
};

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValues);
  const { session, signUp } = useUserAuth();
  const navigate = useNavigate();

  console.log('session', session)

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Google Sign-In Error:', error);
  };
  

  const handleSignIn = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserInfo({ ...userInfo, loading: true})
    try {
      console.log('The user info is: ', userInfo);
      const result = await signUp(userInfo.email, userInfo.password);
      if(result.success){
        navigate('/profile');
      }
    } catch (error) {
      setUserInfo({ ...userInfo, error: "An error occured when signing up" })
      console.log('Error: ', error);
    }finally {
      setUserInfo({ ...userInfo, loading: false});
    }
  };

  return (
    <form onSubmit={handleSignIn}>
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
                value={userInfo.email}
                radius="xl"
                width="xl"
                rightSectionPointerEvents="none"
                rightSection={<CiAt size={16} />}
                label="Your email"
                placeholder="Your email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, email: event.target.value })
                }
              />
              <TextInput
                id="password"
                type="password"
                value={userInfo.password}
                radius="xl"
                width="xl"
                label="Password"
                placeholder="Password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, password: event.target.value })
                }
              />
              <TextInput
                id="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                radius="xl"
                width="xl"
                label="Confirm Password"
                placeholder=" Confirm Password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, confirmPassword: event.target.value })
                }
              />
              <Button type="submit" radius="xl" variant="filled">
                Sign Up
              </Button>
              {userInfo.error && <p color='red'>{userInfo.error}</p> }
              <Text>Already have an account? <Link to='/login'>Login</Link></Text>
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

export default SignUp;
