export function escapeHtml(str, fallback = "") {
    if (str === null || str === undefined) {
        return fallback;
    }

    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/**
 * Güvenli URL üretir.
 * - javascript:, data:, vb. engellenir
 * - Hatalı URL'ler fallback'e düşer
 * - Relative URL'ler desteklenir
 */
export function safeUrl(input, options = {}) {
    const {
        allowedProtocols = ["http:", "https:", "mailto:", "tel:"],
        fallback = "#",
        base = window.location.origin
    } = options;

    if (!input || typeof input !== "string") {
        return fallback;
    }

    try {
        const url = new URL(input, base);

        if (!allowedProtocols.includes(url.protocol)) {
            return fallback;
        }

        return url.href;
    } catch {
        return fallback;
    }
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}