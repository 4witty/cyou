// ============================================
// CYOU - Browser & System Info
// ============================================

// Navigate between pages
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and pages
        navButtons.forEach(b => b.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding page
        btn.classList.add('active');
        const pageId = btn.dataset.page;
        document.getElementById(pageId).classList.add('active');
    });
});

// ============================================
// OS INFORMATION
// ============================================

function getOSInfo() {
    const userAgent = navigator.userAgent;
    let osName = 'Unknown OS';
    let osVersion = 'Unknown';

    if (userAgent.indexOf('Win') !== -1) {
        osName = 'Windows';
        if (userAgent.indexOf('Windows NT 10.0') !== -1) osVersion = '10 or 11';
        else if (userAgent.indexOf('Windows NT 6.3') !== -1) osVersion = '8.1';
        else if (userAgent.indexOf('Windows NT 6.2') !== -1) osVersion = '8';
    } else if (userAgent.indexOf('Mac') !== -1) {
        osName = 'macOS';
        osVersion = userAgent.match(/Mac OS X ([\d._]+)/)?.[1] || 'Unknown';
    } else if (userAgent.indexOf('Linux') !== -1) {
        osName = 'Linux';
        osVersion = 'Unknown Version';
    } else if (userAgent.indexOf('X11') !== -1) {
        osName = 'UNIX';
        osVersion = 'Unknown Version';
    } else if (userAgent.indexOf('Android') !== -1) {
        osName = 'Android';
        osVersion = userAgent.match(/Android ([\d.]+)/)?.[1] || 'Unknown';
    } else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
        osName = 'iOS';
        osVersion = userAgent.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown';
    }

    document.getElementById('os-name').textContent = osName;
    document.getElementById('os-version').textContent = osVersion;
    document.getElementById('os-platform').textContent = navigator.platform || 'Unknown';
    document.getElementById('os-cores').textContent = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('os-ram').textContent = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown';
    document.getElementById('os-resolution').textContent = `${window.screen.width}x${window.screen.height}`;
}

// ============================================
// BROWSER INFORMATION
// ============================================

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let engine = 'Unknown';

    // Detect Browser
    if (userAgent.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
        engine = 'Gecko';
    } else if (userAgent.indexOf('Chrome') !== -1) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (userAgent.indexOf('Safari') !== -1) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/([\d.]+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
    } else if (userAgent.indexOf('Edg') !== -1) {
        browserName = 'Edge';
        browserVersion = userAgent.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (userAgent.indexOf('Trident') !== -1) {
        browserName = 'Internet Explorer';
        browserVersion = userAgent.match(/MSIE ([\d.]+)/)?.[1] || 'Unknown';
        engine = 'Trident';
    }

    document.getElementById('browser-name').textContent = browserName;
    document.getElementById('browser-version').textContent = browserVersion;
    document.getElementById('browser-ua').textContent = userAgent;
    document.getElementById('browser-engine').textContent = engine;
    document.getElementById('browser-lang').textContent = navigator.language || 'Unknown';
    document.getElementById('browser-cookies').textContent = navigator.cookieEnabled ? 'Yes' : 'No';
}

// ============================================
// IP INFORMATION
// ============================================

async function getIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        document.getElementById('ip-address').textContent = data.ip || 'Unknown';
        document.getElementById('ip-country').textContent = data.country_name || 'Unknown';
        document.getElementById('ip-city').textContent = data.city || 'Unknown';
        document.getElementById('ip-region').textContent = data.region || 'Unknown';
        document.getElementById('ip-isp').textContent = data.org || 'Unknown';
        document.getElementById('ip-timezone').textContent = data.timezone || 'Unknown';
    } catch (error) {
        console.error('Error fetching IP info:', error);
        document.getElementById('ip-address').textContent = 'Unable to fetch';
        document.getElementById('ip-country').textContent = 'Error';
        document.getElementById('ip-city').textContent = 'Error';
        document.getElementById('ip-region').textContent = 'Error';
        document.getElementById('ip-isp').textContent = 'Error';
        document.getElementById('ip-timezone').textContent = 'Error';
    }
}

// ============================================
// INITIALIZE ALL INFO ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    getOSInfo();
    getBrowserInfo();
    getIPInfo();
});

console.log('Cyou - Browser & System Info loaded!');
