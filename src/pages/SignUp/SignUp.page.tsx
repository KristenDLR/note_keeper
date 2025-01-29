import { useState } from 'react';
import { logo } from 'assets';
import { useUserAuth } from 'context/userAuthContext';
import { CiAt } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { UserSignIn } from 'types';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './SignUp.module.css';

const initialValues: UserSignIn = {
  email: '',
  password: '',
  confirmPassword: '',
};
interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValues);
  const { googleSignIn, signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault;
    try {
      await googleSignIn();
      navigate('/');
    } catch(error) {
      console.log('Error: ', error);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    //no refresh
    event.preventDefault;
    try {
      console.log('The user info is: ', userInfo);
      await signUp(userInfo.email, userInfo.password);
      navigate('/');
    } catch (error) {
      console.error('Error: ', error);
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
            <Group>
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
              <Text>Have an account Sign In</Text>
            </Group>
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
