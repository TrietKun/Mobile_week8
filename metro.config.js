const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'), // Tùy chỉnh các định dạng tài nguyên nếu cần
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'], // Thêm bất kỳ định dạng nguồn bổ sung nào bạn cần
    },
  };
})();
