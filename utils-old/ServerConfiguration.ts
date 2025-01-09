import "server-only";

export function getProjectId(): string {
  const config = process.env.FIREBASE_CONFIG;
  if (!config) {
    throw Error(config);
  }
  return JSON.parse(config).projectId;
}
