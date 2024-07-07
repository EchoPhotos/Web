export function formatBytes(bytes: number): string {
  if (bytes < 0) {
    throw new Error("Bytes cannot be negative");
  }

  const MB = 1024 * 1024;
  const GB = 1024 * 1024 * 1024;

  if (bytes >= GB) {
    const gbValue = (bytes / GB).toFixed(2); // Format to 2 decimal places
    return `${gbValue} GB`;
  } else if (bytes >= MB) {
    const mbValue = (bytes / MB).toFixed(2); // Format to 2 decimal places
    return `${mbValue} MB`;
  } else {
    return `${bytes} bytes`; // For bytes less than 1 MB
  }
}
