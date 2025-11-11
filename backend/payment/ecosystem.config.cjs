module.exports = {
	apps: [
	   {
		name: "backend",
		script: "./server.js",
		cwd: "/home/trilho-academico/backend/payment",
		env: {
			NODE_ENV: "production",
			PORT: 5000,
		}
	  }
	]
      };
