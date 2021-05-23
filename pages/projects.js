import Head from 'next/head'
import { motion } from 'framer-motion'

import Header from 'components/Header'

import { loadProjects } from 'lib/project'
import { springSimple } from 'lib/transition'

export default function Projects ({ projects }) {
  return <div>
    <Head>
      <title>Projects | Daily Oops!</title>
    </Head>

    <motion.div className='markdown-body mx-auto pt-4 pb-6 px-3 container-lg' style={{ maxWidth: 700, columns: '6 250px', columnGap: '1rem' }} layoutId='project' {...springSimple}>
      { projects.map(project => {
        return <a className="Box d-inline-block ma-2 mb-5 overflow-hidden no-underline" href={project.link} target="_blank" style={{ width: 'calc(100% - 16px)', height: '100%' }}>
          {
            project.image && <img src={project.image} style={{ borderRadius: 0 }} />
          }
          <div className='px-3 pa-2'>
            <h3 className="color-text-primary">{ project.title }</h3>
            <p className="color-text-secondary">
              { project.description }
            </p>
          </div>
        </a>
      }) }
    </motion.div>
  </div>
}

export async function getStaticProps() {
  return {
    props: {
      projects: loadProjects()
    }
  }
}
