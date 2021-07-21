import { Box, Text } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>It's Doggo Time</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Box>
        <Text>Home</Text>
      </Box>
    </>
  );
}
