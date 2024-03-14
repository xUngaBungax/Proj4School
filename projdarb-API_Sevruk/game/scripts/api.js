const apiUrl = 'http://localhost/api/'

function getFullApiUrl(endpoint) {
    return `${apiUrl}${endpoint}`;
}

export async function sendRequest(endpoint, type, payload = null) {
    let url = getFullApiUrl(endpoint);

    if (type === 'GET' && payload !== null) {
        url = url + '?' + new URLSearchParams(payload).toString();
    }
    
    const response = await fetch(url, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
        },
        body: type !== 'GET' ? JSON.stringify(payload) : null,
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}