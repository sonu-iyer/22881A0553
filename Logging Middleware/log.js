export async function Log(stack, level, packageName, message) {
  const timestamp = new Date().toISOString();

  const logEntry = {
    stack,
    level,
    package: packageName,
    message,
    timestamp
  };

  try {
    const response = await fetch('https://log-api.affordmed.com/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logEntry)
    });

    if (!response.ok) {
      console.error(`Server log failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Server logging error:', error);
  }
}
