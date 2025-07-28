export const log = (message, level = 'info') => {
  const timestamp = new Date().toLocaleString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  console.log(`${prefix}: ${message}`);
};