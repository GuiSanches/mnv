import type { NextPage } from 'next'
import Head from 'next/head'
import Canvas from '../src/Sections/Canvas'
import Header from '../src/Sections/Header'

const Home: NextPage = () => {

  return (
    <div style={{position: 'relative'}}>
      <Head>
        <title>MNV - web interface for large scale Networks</title>
        <meta name="description" content="MNV Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Canvas />
    </div>
  )
}

export default Home
