import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAssetsForVersion } from '../fetchTemurinArchive';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];

global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse),
  headers: {
    get: () => '3'
  }
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('getAssetsForVersion', () => {
  it('returns valid JSON', async() => {
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - with source', async() => {
    mockResponse[0].binaries[0].image_type = 'sources';
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - with installers', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });
});