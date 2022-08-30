import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = ({ data }: any) => {
  console.log('BREWERIES: ', data);
  return (
    <Stack p={5}>
      <Heading>Tipsy List</Heading>
      {data.map((brewery: any) => {
        return (
          <Stack key={brewery.id} borderRadius={5} borderWidth={1} p={2}>
            <Link href={brewery.website_url}>
            <Text fontWeight={'bold'}>{brewery.name}</Text>
            </Link>
            <Stack spacing={0}>
              <Text>{brewery.street}</Text>

              <Text>
                {brewery.city}, {brewery.state}
              </Text>
              <Button onClick={()=> Router.push(`https://maps.google.com?q=${brewery.latitude},${brewery.longitude}`)}>Google Maps</Button>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  try {
    const resesponse = await fetch(`https://api.openbrewerydb.org/breweries`);
    const data = await resesponse.json();

    return { props: { data } };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};
