const createToken = (user: any) => {
  return {
    id: user.id,
  };
};

module.exports = { createToken };
