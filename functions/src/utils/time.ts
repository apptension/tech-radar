export const getIsoDateWithoutTime = () => new Date().toISOString().split('T')[0];
