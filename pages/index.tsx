import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Tester from '../src/data/Network/index'
import Header from '../src/Sections/Header'
import styles from '../styles/Home.module.css'
import { Wrapper } from './global'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>MNV - web interface for large scale Networks</title>
        <meta name="description" content="MNV Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Header />
      </Wrapper >
    </div>
  )
}

export default Home
