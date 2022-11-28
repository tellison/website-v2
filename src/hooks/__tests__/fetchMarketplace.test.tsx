import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAllPkgsForVersion, getImageForDistribution } from '../fetchMarketplace';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';
import vendors from '../../json/marketplace.json';

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];
let ref = { current: {} };

// Mock checkbox values
for (let vendor of vendors) {
  const checked = true;
  ref.current[`vendor${vendor.name.replace(/\s+/g, '')}`] = { checked };
}

global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse)
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('getAllPkgsForVersion', () => {
  it('returns valid JSON', async() => {
    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', ref).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - Alpine Linux', async() => {
    renderHook(async() => {
      await getAllPkgsForVersion(8, 'alpine-linux', 'x64', 'any', ref).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - installer', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];
    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', ref).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('getImageForDistribution tests', () => {
    expect(getImageForDistribution('microsoft')).toBe('/images/microsoft-logo.png');
    expect(getImageForDistribution('temurin')).toBe('/images/adoptium-logo.png');
    expect(getImageForDistribution('redhat')).toBe('/images/redhat.svg');
    expect(getImageForDistribution('bisheng')).toBe('/images/huawei.svg');
    expect(getImageForDistribution('zulu')).toBe('/images/azul-logo.png');
    expect(getImageForDistribution('semeru')).toBe('/images/ibm-logo.png');
  });
});