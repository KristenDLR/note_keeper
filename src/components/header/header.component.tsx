import { smallLogo } from 'assets';
import { ColorSchemeToggle } from 'components/colorSchemeToggle/colorSchemeToggle.component';
import { Box, Burger, Container, Group, Image, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

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
        <Group gap={5} visibleFrom="xs">
          <ColorSchemeToggle />
          {/* {items} */}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
