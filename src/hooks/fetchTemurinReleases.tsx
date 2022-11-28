import { VersionMetaData } from '.';
import { fetchExtension } from '../util/fetchExtension';

const baseUrl = 'https://api.adoptium.net/v3';

export async function loadLatestAssets(
    version: number,
    os: string,
    architecture: string,
    packageType: string
): Promise<ReleaseAsset[]> {
    let url = new URL(`${baseUrl}/assets/latest/${version}/hotspot?`);
    if (os !== 'any') {
        url.searchParams.append('os', os);
    }
    if (architecture !== 'any') {
        url.searchParams.append('architecture', architecture);
    }
    if (packageType !== 'any') {
        url.searchParams.append('image_type', packageType);
    }
    let data = await getPkgs(url);
    let pkgsFound: TemurinRelease[] = []
    for (let pkg of data) {
        pkgsFound.push(pkg);
    }
    return renderReleases(pkgsFound);
}

async function getPkgs(url: URL) {
    let response = await fetch(url)
    return response.json();
}

function renderReleases(pkgs: Array<TemurinRelease>): ReleaseAsset[] {
    let releases: ReleaseAsset[] = []
    pkgs.forEach((releaseAsset: TemurinRelease) => {
        const platform = `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`

        // Skip this asset if it's not a binary type we're interested in displaying
        const binary_type = releaseAsset.binary.image_type.toUpperCase();
        if (binary_type == 'SOURCES') {
            releases['source'] = releaseAsset;
        }
        if (!['INSTALLER', 'JDK', 'JRE'].includes(binary_type)) {
            return;
        }
        // Get the existing release asset (passed to the template) or define a new one
        let release: ReleaseAsset | undefined = releases.find((release: ReleaseAsset) => release.platform_name === platform);
        if (!release) {
            release = {
                platform_name: `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`,
                os: releaseAsset.binary.os,
                architecture: releaseAsset.binary.architecture,
                release_name: releaseAsset.release_name,
                release_link: new URL(releaseAsset.release_link),
                release_date: new Date(releaseAsset.binary.updated_at),
                binaries: []
            };
        }

        let binary_constructor: Binary = {
            type: binary_type,
            link: releaseAsset.binary.package.link,
            checksum: releaseAsset.binary.package.checksum,
            size: Math.floor(releaseAsset.binary.package.size / 1000 / 1000),
            extension: fetchExtension(releaseAsset.binary.package.name)
        };

        if (releaseAsset.binary.installer) {
            binary_constructor.installer_link = releaseAsset.binary.installer.link;
            binary_constructor.installer_checksum = releaseAsset.binary.installer.checksum;
            binary_constructor.installer_size =  Math.floor(releaseAsset.binary.installer.size / 1000 / 1000);
            binary_constructor.installer_extension = fetchExtension(releaseAsset.binary.installer.name);
        }

        // Add the new binary to the release asset
        release.binaries.push(binary_constructor);

        // We have the first binary, so add the release asset.
        if (release.binaries.length === 1) {
            releases.push(release);
        }

        releases = orderPlatforms(releases, 'platform_ordinal');
        releases.forEach((release) => {
            release.binaries.sort((binaryA, binaryB) => binaryA.type > binaryB.type ? 1 : binaryA.type < binaryB.type ? -1 : 0);
        });
    })
    return releases
}

function orderPlatforms (input, attr = 'thisPlatformOrder') {
  return sortByProperty(input, attr, false);
};

function sortByProperty (input, property, descending) {
  const invert = descending ? -1 : 1;
  const sorter = (a, b) => {
    return invert * (a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0);
  };

  if (Array.isArray(input)) {
    return input.sort(sorter);
  } else {
    // Preserve the source object key as '_key'
    return Object.keys(input)
      .map(_key => Object.assign(input[_key], {_key}))
      .sort(sorter);
  }
};

export interface ReleaseAsset {
    platform_name: string;
    os: string;
    architecture: string;
    release_name: string;
    release_link: URL;
    release_date: Date;
    binaries: Array<Binary>;
}

interface TemurinRelease {
    release_link: URL;
    os: string;
    architecture: string;
    platform_name: string;
    release_name: string;
    release_date: Date;
    binary: {
        updated_at: Date;
        os: string;
        architecture: string;
        image_type: string;
        jvm_impl: string;
        package: {
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
        installer?: {
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
    }
}

interface Binary {
    type: string;
    link: URL;
    checksum: string;
    size: number;
    extension: string;
    installer_link?: URL;
    installer_checksum?: string;
    installer_size?: number;
    installer_extension?: string;
}

export interface MockTemurinReleaseAPI {
    release_link: URL;
    release_name: string;
    vendor: string;
    version: VersionMetaData
    binary: {
        project: string;
        scm_ref: string;
        updated_at: Date;
        os: string;
        architecture: string;
        download_count: number;
        heap_size: string;
        image_type: string;
        jvm_impl: string;
        package: {
            download_count: number;
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
        installer?: {
            download_count: number;
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
    }
}
