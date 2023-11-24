module.exports = {
  apps: [
    {
      name: "tugas_mingguan_backend",
      script: "./bin/www",
      watch: true,
      exec_mode: "cluster",
      instance: "max",
    },
  ],
};
