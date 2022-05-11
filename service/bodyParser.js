module.exports = (req) => {
  return new Promise((resolve) => {
    const requestBody = [];
    req.on('data', (chunks) => {
      requestBody.push(chunks);
    });
    req.on('end', () => {
      resolve(JSON.parse(Buffer.concat(requestBody)));
    });
  });
};
