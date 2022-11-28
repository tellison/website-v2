import {
  Binary,
  ContributorApiResponse,
  Contributor,
  EventAPI,
  LatestTemurin,
  MarketplaceRelease,
  MockTemurinFeatureReleaseAPI,
  MockTemurinReleaseAPI,
  News,
  NewsResponse,
  ReleaseAsset,
  TemurinReleases,
} from '../hooks';

export const createRandomTemurinRelease = (installer): ReleaseAsset => ({
  os: 'os_mock',
  architecture: 'arch_mock',
  release_link: new URL('https://release_link_mock'),
  platform_name: 'platform_name_mock',
  release_name: 'release_name_mock',
  release_date: new Date(Date.UTC(2020, 0, 1)),
  binaries: [
    {
      type: 'type_mock',
      link: new URL('https://link_mock'),
      checksum: 'checksum_mock',
      size: 0,
      extension: 'extension_mock',
      installer_link: installer ? new URL('https://installer_link_mock') : undefined,
      installer_checksum: installer ? 'installer_checksum_mock' : undefined,
      installer_size: installer ? 0 : undefined,
      installer_extension: installer ? 'installer_extension_mock' : undefined,
    },
  ],
})

export const createRandomMarketplaceRelease = (installer, id): MarketplaceRelease => ({
  release_name: 'release_name_mock',
  vendor: 'vendor_mock',
  binary: {
    os: 'os_mock',
    architecture: 'arch_mock',
    distribution: 'distribution_mock',
    image_type: 'type_mock',
    jvm_impl: 'jvm_impl_mock',
    timestamp: new Date(Date.UTC(2020, 0, 1)),
    scm_ref: 'scm_ref_mock',
    openjdk_scm_ref: 'openjdk_scm_ref_mock',
    aqavit_results_link: new URL('https://aqavit_results_link_mock'),
    tck_affidavit_link: new URL('https://tck_affidavit_link_mock'),
    package: {
      name: 'name_mock.tar.gz',
      link: new URL('https://link_mock'),
      sha265sum: `sha265sum_mock${id}`,
      sha256sum_link: new URL('https://sha256sum_link_mock'),
      signature_link: new URL('https://signature_link_mock'),
    },
    installer: installer
      ? [
          {
            name: 'installer_name_mock.msi',
            link: new URL('https://installer_link_mock'),
            sha265sum: 'installer_sha265sum_mock',
            sha256sum_link: new URL('https://installer_sha256sum_link_mock'),
            signature_link: new URL('https://installer_signature_link_mock'),
          },
        ]
      : undefined,
  },
  version: {
    major: 0,
    minor: 0,
    security: 0,
    patch: 0,
    build: 0,
    openjdk_version: 'openjdk_version_mock',
  }
})

export const mockLatestTemurin = (installer): LatestTemurin => ({
  download_count: 0,
  id: 'id_mock',
  release_link: new URL('https://release_link_mock'),
  release_name: 'release_name_mock',
  release_type: 'release_type_mock',
  timestamp: new Date(Date.UTC(2020, 0, 1)),
  updated_at: new Date(Date.UTC(2020, 0, 1)),
  vendor: 'vendor_mock',
  version_data: {
    major: 0,
    minor: 0,
    security: 0,
    patch: 0,
    build: 0,
    openjdk_version: 'openjdk_version_mock',
  },
  binaries: [
    {
      os: 'os_mock',
      architecture: 'arch_mock',
      image_type: 'type_mock',
      heap_size: 'heap_size_mock',
      download_count: 0,
      jvm_impl: 'jvm_impl_mock',
      package: {
        name: 'name_mock.tar.gz',
        link: new URL('https://link_mock'),
        checksum: 'sha265sum_mock',
        checksum_link: new URL('https://sha256sum_link_mock'),
        metadata_link: new URL('https://metadata_link_mock'),
        signature_link: new URL('https://signature_link_mock'),
        size: 0,
        download_count: 0,
      },
      installer: installer
      ?
        {
          name: 'installer_name_mock.msi',
          link: new URL('https://installer_link_mock'),
          checksum: 'installer_sha265sum_mock',
          checksum_link: new URL('https://installer_sha256sum_link_mock'),
          metadata_link: new URL('https://installer_metadata_link_mock'),
          signature_link: new URL('https://installer_signature_link_mock'),
          size: 0,
          download_count: 0,
        }
      : undefined,
    }
  ]
})

export const mockNewsAPI = (): NewsResponse => ({
  news: [
    {
      title: 'news_title_mock',
      body: 'body_mock',
      id: 'id_mock',
      link: new URL('https://link_mock'),
      date: new Date(Date.UTC(2020, 0, 1)),
    }
  ],
  pagination: {
    page: 1,
    pagesize: 5,
    result_start: 1,
    result_end: 5,
    result_size: 5,
    total_result_size: 16
  }
});

export const mockEventsAPI = (): EventAPI => ({
  events: [
    {
      title: 'events_title_mock',
      id: 'id_mock',
      infoLink: new URL('https://link_mock'),
      date: new Date(Date.UTC(2020, 0, 1)),
    }
  ]
});

export const createMockTemurinReleaseAPI = (installer): MockTemurinReleaseAPI => ({
  release_link: new URL('https://release_link_mock'),
  release_name: 'release_name_mock',
  vendor: 'vendor_mock',
  version: {
    major: 0,
    minor: 0,
    security: 0,
    patch: 0,
    build: 0,
    openjdk_version: 'openjdk_version_mock',
  },
  binary: {
    architecture: 'arch_mock',
    project: 'project_mock',
    scm_ref: 'scm_ref_mock',
    download_count: 0,
    updated_at: new Date(Date.UTC(2020, 0, 1)),
    os: 'os_mock',
    image_type: 'jdk',
    jvm_impl: 'jvm_impl_mock',
    heap_size: 'heap_size_mock',
    package: {
      name: 'name_mock.tar.gz',
      link: new URL('https://link_mock'),
      checksum: 'checksum_mock',
      checksum_link: new URL('https://checksum_link_mock'),
      metadata_link: new URL('https://metadata_link_mock'),
      signature_link: new URL('https://signature_link_mock'),
      size: 0,
      download_count: 0,
    },
    installer: installer
      ? {
          name: 'installer_name_mock.msi',
          link: new URL('https://installer_link_mock'),
          checksum: 'installer_checksum_mock',
          checksum_link: new URL('https://installer_checksum_link_mock'),
          metadata_link: new URL('https://installer_metadata_link_mock'),
          signature_link: new URL('https://installer_signature_link_mock'),
          size: 0,
          download_count: 0,
        }
      : undefined,
  }
});

export const createMockTemurinFeatureReleaseAPI = (installer): MockTemurinFeatureReleaseAPI => ({
  id: 'id_mock',
  download_count: 0,
  release_name: 'release_name_mock',
  release_link: new URL('https://release_link_mock'),
  release_type: 'release_type_mock',
  timestamp: new Date(Date.UTC(2020, 0, 1)),
  updated_at: new Date(Date.UTC(2020, 0, 1)),
  vendor: 'vendor_mock',
  version_data: {
    major: 0,
    minor: 0,
    security: 0,
    patch: 0,
    build: 0,
    openjdk_version: 'openjdk_version_mock',
  },
  binaries: [
    {
      os: 'os_mock',
      architecture: 'arch_mock',
      image_type: 'jdk',
      package: {
        name: 'name_mock.tar.gz',
        checksum: 'checksum_mock',
        link: new URL('https://link_mock'),
        size: 0,
      },
      installer: installer
        ? {
          name: 'installer_name_mock.msi',
          checksum: 'installer_checksum_mock',
          link: new URL('https://installer_link_mock'),
          size: 0,
        }
      : undefined,
    }
  ]
});

export const createRandomTemurinReleases = (installer): TemurinReleases => ({
  release_name: 'release_name_mock',
  release_link: new URL('https://release_link_mock'),
  source_url: new URL('https://source_url_mock'),
  timestamp: new Date(Date.UTC(2020, 0, 1)),
  platforms: {
    'platform_mock': {
      assets: [
        {
          os: 'os_mock',
          architecture: 'architecture_mock',
          type: 'type_mock',
          link: new URL('https://link_mock'),
          checksum: 'checksum_mock',
          size: 0,
          extension: 'extension_mock',
          installer_link: installer ? new URL('https://installer_link_mock') : undefined,
          installer_checksum: installer ? 'installer_checksum_mock' : undefined,
          installer_size: installer ? 0 : undefined,
          installer_extension: installer ? 'installer_extension_mock' : undefined,
        },
      ],
    },
  },
})

export const createRandomContributorViewData = (): Contributor => ({
  avatarUri: 'avatarUri_mock',
  profileUri: 'profileUri_mock',
  login: 'login_mock',
  contributionsCount: 0,
  commitsListUri: 'commitsListUri_mock',
  repo: 'reponame_mock',
});

export const createRandomLatestForOSData = (): Binary => ({
  release_name: 'release_name_mock',
  link: new URL('https://link_mock'),
});

export const createRandomNewsAndEventsData = (): News => ({
  news: {
    news: [
      {
        id: 'id_mock',
        title: 'title_mock',
        body: 'body_mock',
        date: new Date(Date.UTC(2020, 0, 1)),
        link: new URL('https://link_mock'),
      },
    ],
    pagination: {
      page: 1,
      pagesize: 5,
      result_start: 1,
      result_end: 5,
      result_size: 5,
      total_result_size: 16,
    }
  },
  events: [
    {
      id: 'id_mock',
      title: 'title_mock',
      infoLink: new URL('https://infoLink_mock'),
      date: new Date(Date.UTC(2020, 0, 1)),
    },
  ]
});

export const createRandomContributorViewData1Contribution = (): Contributor => ({
  avatarUri: 'avatarUri_mock',
  profileUri: 'profileUri_mock',
  login: 'login_mock',
  contributionsCount: 1,
  commitsListUri: 'commitsListUri_mock',
  repo: 'reponame_mock',
});