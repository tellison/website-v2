import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { FaArrowCircleRight } from 'react-icons/fa'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import VersionSelector from '../../components/VersionSelector'
import ChecksumModal from '../../components/ChecksumModal'
import TemurinArchiveTable from '../../components/TemurinArchiveTable'
import { getAssetsForVersion } from '../../hooks'

const TemurinReleases = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-10 col-md-8 mx-auto'>
          <h1 className='fw-light'>Archive</h1>
          <div className='row align-items-center pt-2'>
            <div className='callout callout-default text-start'>
              Please be aware that this archive contains old releases and intermediate builds created as a development step towards a <Link to='/temurin/releases'>full release</Link>.
              Using old, superseded, or otherwise unsupported builds is not recommended. Intermediate builds are ephemeral, and may disappear in the future.
              <br />
              <br />
              The following notice applies to intermediate builds:
              <br />
              &ldquo;This is an intermediate build made available for testing purposes only. The code is untested and presumed incompatible with the Java SE specification.
              You should not deploy or write to this code, but instead use the tested and certified Java SE compatible version of the code that is available at <a href='https://adoptium.net'>adoptium.net</a>.
              Redistribution of any Intermediate Build must retain this notice.&rdquo;
            </div>
            <div className='btn-group'>
              <Link to='/temurin/releases' className='btn btn-primary m-3'>
                <Trans>Latest Releases</Trans> <FaArrowCircleRight />
              </Link>
              <Link to='/temurin/nightly' className='btn btn-secondary m-3'>
                <Trans>Nightly Builds</Trans> <FaArrowCircleRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <VersionSelector updater={getAssetsForVersion} releaseType='ga' Table={TemurinArchiveTable} />
      <ChecksumModal />
    </section>
  </Layout>
)

export default TemurinReleases

export const Head = () => (
  <Seo title='Archive' />
)

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
