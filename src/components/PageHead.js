import Head from 'next/head'

export default function PageHead ({title, description}) {

  title = 'R3F Samples | ' + title
  
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
