const generateBasicId = prefix => {
   return `${prefix}-${Date.now().toString(36) + Math.random().toString(36).slice(2, 8)}`;
};

export default generateBasicId;
