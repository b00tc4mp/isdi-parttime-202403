const IdGenerator = () => {
  let Id = ``;

  return {
    generatePostId() {
      const randomString = Math.random().toString(36).substring(2, 8);
      const timestamp = Date.now();
      Id = `${randomString}-${timestamp}`;
      return Id;
    },
  };
};
