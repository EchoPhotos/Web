import 'server-only';

export function getProjectId(): string {
  const config = process.env.FIREBASE_CONFIG;
  if (!config) {
    throw Error('FIREBASE_CONFIG is not set');
  }
  try {
    return JSON.parse(config).projectId;
  } catch {
    throw Error('Failed to parse FIREBASE_CONFIG');
  }
}
