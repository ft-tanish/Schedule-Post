import { StorageUtils } from '@/utils/storage.utils';

describe('StorageUtils', () => {
  let mockLocalStorage: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create fresh localStorage mock for each test
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  describe('getItem', () => {
    it('should return null when item does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = StorageUtils.getItem('test-key');
      expect(result).toBeNull();
    });

    it('should return parsed item when item exists', () => {
      const testData = { test: 'value' };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(testData));

      const result = StorageUtils.getItem('test-key');
      expect(result).toEqual(testData);
    });

    it('should handle JSON parsing errors gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = StorageUtils.getItem('test-key');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('setItem', () => {
    it('should save item successfully', () => {
      const testData = { test: 'value' };
      const result = StorageUtils.setItem('test-key', testData);

      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData)
      );
    });

    it('should handle storage errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const result = StorageUtils.setItem('test-key', { test: 'value' });

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getPosts', () => {
    it('should return empty array when no posts saved', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = StorageUtils.getPosts();
      expect(result).toEqual([]);
    });

    it('should parse and return posts with proper date objects', () => {
      const mockPosts = [
        {
          id: '1',
          content: 'Test post',
          scheduledTime: '2025-01-01T12:00:00Z',
          status: 'scheduled',
          createdAt: '2024-01-01T10:00:00Z',
        },
      ];

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockPosts));
      const result = StorageUtils.getPosts();

      expect(result).toHaveLength(1);
      expect(result[0].scheduledTime).toBeInstanceOf(Date);
      expect(result[0].createdAt).toBeInstanceOf(Date);
    });
  });
});
