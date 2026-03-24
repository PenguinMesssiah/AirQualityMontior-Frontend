/**
 * Production-grade fetch utility with retry logic and specific error handling
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @returns {Promise<Response>} - The fetch response
 * @throws {Error} - Throws detailed error messages for different failure scenarios
 */
export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);

            // Handle specific HTTP status codes
            if (!response.ok) {
                const errorDetails = await getErrorDetails(response, url);

                switch (response.status) {
                    case 400:
                        throw new Error(`Bad Request: ${errorDetails}. Please check the request parameters.`);

                    case 401:
                        throw new Error(`Unauthorized: ${errorDetails}. Authentication is required.`);

                    case 403:
                        throw new Error(`Forbidden: ${errorDetails}. You don't have permission to access this resource.`);

                    case 404:
                        throw new Error(`Not Found: The requested resource could not be found. ${errorDetails}`);

                    case 429:
                        // Rate limiting - wait 30 seconds and retry
                        if (attempt < maxRetries) {
                            console.warn(`Rate limited (429). Waiting 30 seconds before retry ${attempt + 1}/${maxRetries}...`);
                            await sleep(30000);
                            continue;
                        }
                        throw new Error(`Too Many Requests: Rate limit exceeded. Please try again later.`);

                    case 500:
                    case 502:
                    case 503:
                    case 504:
                        // Server errors - retry with backoff
                        if (attempt < maxRetries) {
                            const delay = calculateBackoff(attempt);
                            console.warn(`Server error (${response.status}). Retrying in ${delay/1000}s... (${attempt + 1}/${maxRetries})`);
                            await sleep(delay);
                            continue;
                        }
                        throw new Error(`Server Error (${response.status}): ${errorDetails}. The server is experiencing issues. Please try again later.`);

                    default:
                        throw new Error(`HTTP Error ${response.status}: ${errorDetails}`);
                }
            }

            // Successful response
            return response;

        } catch (error) {
            lastError = error;

            // Don't retry on specific errors (4xx except 429)
            if (error.message.includes('Bad Request') ||
                error.message.includes('Unauthorized') ||
                error.message.includes('Forbidden') ||
                error.message.includes('Not Found')) {
                throw error;
            }

            // Network errors or server errors - retry with backoff
            if (attempt < maxRetries) {
                const delay = calculateBackoff(attempt);
                console.warn(`Network error. Retrying in ${delay/1000}s... (${attempt + 1}/${maxRetries})`, error.message);
                await sleep(delay);
                continue;
            }

            // Max retries exceeded
            if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
                throw new Error(`Network Error: Unable to connect to the server. Please check your internet connection and try again.`);
            }

            throw error;
        }
    }

    // Should never reach here, but just in case
    throw lastError || new Error('Unknown error occurred during fetch');
}

/**
 * Extract error details from response
 */
async function getErrorDetails(response, url) {
    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const json = await response.json();
            return json.message || json.error || JSON.stringify(json);
        } else {
            const text = await response.text();
            return text.substring(0, 100); // Limit error message length
        }
    } catch {
        return `Failed to fetch from ${url}`;
    }
}

/**
 * Calculate exponential backoff delay with max of 30 seconds
 */
function calculateBackoff(attempt) {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s (capped)
    const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
    return delay;
}

/**
 * Sleep utility
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convenience wrapper for JSON responses
 */
export async function fetchJsonWithRetry(url, options = {}, maxRetries = 3) {
    const response = await fetchWithRetry(url, options, maxRetries);
    return await response.json();
}
