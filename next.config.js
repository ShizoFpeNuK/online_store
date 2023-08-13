/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "fastly.picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "baratazo.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.redd.it",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "infobae.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "inhouse.infobae.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dfcdn.defacto.com.tr",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "placeimg.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.gettyimages.in",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.lorem.space",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
