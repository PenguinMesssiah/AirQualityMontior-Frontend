/**
 * Custom error class for retryable errors (network failures, 429, 5xx)
 */
class RetryableError extends Error {
    constructor(status, message, customDelay = null) {
        super(message);
        this.name = 'RetryableError';
        this.status = status;
        this.customDelay = customDelay;  // For special cases like 429 (30s delay)
    }
}

/**
 * Custom error class for fatal errors that should not be retried (4xx except 429)
 */
class FatalError extends Error {
    constructor(status, message) {
        super(message);
        this.name = 'FatalError';
        this.status = status;
    }
}

/**
 * Production-grade fetch utility with retry logic and specific error handling
 *
 * Architecture:
 * - try block: Categorizes errors by throwing RetryableError or FatalError
 * - catch block: Handles ALL retry logic in one place
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

                // Categorize errors: Fatal (don't retry) vs Retryable (retry with backoff)
                switch (response.status) {
                    case 400:
                        throw new FatalError(
                            400,
                            `Bad Request: ${errorDetails}. Please check the request parameters.`
                        );

                    case 401:
                        throw new FatalError(
                            401,
                            `Unauthorized: ${errorDetails}. Authentication is required.`
                        );

                    case 403:
                        throw new FatalError(
                            403,
                            `Forbidden: ${errorDetails}. You don't have permission to access this resource.`
                        );

                    case 404:
                        throw new FatalError(
                            404,
                            `Not Found: The requested resource could not be found. ${errorDetails}`
                        );

                    case 429:
                        // Rate limiting - needs special 30 second delay before retry
                        throw new RetryableError(
                            429,
                            `Too Many Requests: Rate limit exceeded. Please try again later.`,
                            30000  // Custom 30s delay
                        );

                    case 500:
                    case 502:
                    case 503:
                    case 504:
                        // Server errors - retry with exponential backoff
                        throw new RetryableError(
                            response.status,
                            `Server Error (${response.status}): ${errorDetails}. The server is experiencing issues. Please try again later.`
                        );

                    default:
                        // Unknown error - treat as retryable
                        throw new RetryableError(
                            response.status,
                            `HTTP Error ${response.status}: ${errorDetails}`
                        );
                }
            }

            // Successful response
            return response;

        } catch (error) {
            lastError = error;

            // 1. Fatal errors should NEVER be retried (4xx errors)
            if (error instanceof FatalError) {
                throw error;
            }

            // 2. Retryable errors - retry with backoff if attempts remaining
            if (error instanceof RetryableError && attempt < maxRetries) {
                const delay = error.customDelay || calculateBackoff(attempt);
                const errorType = error.status === 429
                    ? 'Rate limit'
                    : error.status >= 500
                        ? 'Server error'
                        : 'Error';
                console.warn(`${errorType} (${error.status}). Retrying in ${delay/1000}s... (${attempt + 1}/${maxRetries})`);
                await sleep(delay);
                continue;  // Retry
            }

            // 3. Network errors (fetch failed completely) - retry with backoff
            //    These are native errors from fetch itself, not our custom errors
            if (!(error instanceof RetryableError) && !(error instanceof FatalError)) {
                if (attempt < maxRetries) {
                    const delay = calculateBackoff(attempt);
                    console.warn(`Network error. Retrying in ${delay/1000}s... (${attempt + 1}/${maxRetries})`, error.message);
                    await sleep(delay);
                    continue;  // Retry
                }

                // Max retries exceeded for network error
                throw new Error(`Network Error: Unable to connect to the server. Please check your internet connection and try again. (${error.message})`);
            }

            // 4. Max retries exceeded for retryable error
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
