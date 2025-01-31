import { useState } from 'react';
import { smallLogo } from 'assets';
import { ColorSchemeToggle } from 'components/colorSchemeToggle/colorSchemeToggle.component';
import { Box, Burger, Container, Group, Image, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

import classes from './header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

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
