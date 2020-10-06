import Head from 'next/head'

import Header from '../components/Header'

import { loadProjects } from '../lib/project'

export default function Projects ({ projects }) {
  return <div>
    <Head>
      <title>Projects | Daily Oops!</title>
    </Head>

    <Header />

    <div className='markdown-body mx-auto pt-4 pb-6 px-3 container-lg' style={{ maxWidth: 700 }}>
      { projects.map(project => {
        return <div className='col-12 col-sm-6 d-inline-block'>
        <a className="d-inline-block box-shadow-medium mx-2 px-3 pt-4 pb-6 position-relative rounded-1 overflow-hidden no-underline" href={project.link} target="_blank" style={{ width: 'calc(100% - 16px)', height: 200 }}>
          <h3 className="text-gray-dark">{ project.title }</h3>
          <p className="text-gray">
            { project.description }
          </p>
        </a>
        </div>
      }) }
    </div>
  </div>
}

export async function getStaticProps() {
  return {
    props: {
      projects: loadProjects()
    }
  }
}
