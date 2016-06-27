module.exports = {
  rules: [
    {
      //这里的respondwith的内容映衬在了pattern里面了
      pattern: /\/api\/getLivelist.php\?rtype=origin$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=more$/,
      respondwith: './livelist-more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=refresh$/,
      respondwith: './livelist-refresh.json'
    },
    {
      pattern: /\/api\/getLiveDetail.php\?id=1$/,
      respondwith: './detail.json'
    }
  ]
};
