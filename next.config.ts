import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
	// ❌ Desactiva Turbopack para evitar el error
	// experimental: {
	// 	turbo: {},
	// },
};

export default nextConfig;
