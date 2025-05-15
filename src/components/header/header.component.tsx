import { Box, Burger, Button, Container, Group, Image, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { smallLogo } from 'assets';
import { ColorSchemeToggle } from 'components/colorSchemeToggle/colorSchemeToggle.component';
import { useUserAuth } from 'context/userAuthContext';
import classes from './header.module.css';
import { useNavigate } from 'react-router-dom';


interface IHeaderProps {
}

export const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
  const { session, signOut } = useUserAuth();

  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Box className={classes.logoContainer} pt="30px" pb="30px">
          <Image className={classes.logo} src={smallLogo} />
        </Box>
        <Title className={classes.title} ta="center" mt={50}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Note Keeper
          </Text>
        </Title>
        <Box>
          <Text>Welcome, {session?.user.email} </Text>
        </Box>
        <Group gap={5} visibleFrom="xs">
          <ColorSchemeToggle />
          {/* {items} */}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Button mt='30' onClick={handleSignOut}> Sign Out</Button>
      </Container>
    </header>
  );
}
