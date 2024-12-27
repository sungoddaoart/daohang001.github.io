const { withPayload } = require('@payloadcms/next-payload');

module.exports = withPayload({
  // 你的 Next.js 配置
  experimental: {
    serverActions: true,
  },
});

