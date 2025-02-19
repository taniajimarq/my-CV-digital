import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.html$/,
			use: 'html-loader',
		});
		if (!isServer)
			config.resolve.fallback = {
				fs: false,
				path: false,
				os: false,
			};

		return config;
	},
};

export default nextConfig;
