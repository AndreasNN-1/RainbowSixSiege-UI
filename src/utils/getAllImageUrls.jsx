export function getAllImageUrls(data) {
    const urls = [];

    function recurse(obj) {
        if (typeof obj === "object" && obj !== null) {
            for (let key in obj) {
                if (key.toLowerCase() === "img" && typeof obj[key] === "string" && obj[key].includes("http")) {
                    urls.push(obj[key]);
                } else {
                    recurse(obj[key]);
                }
            }
        }
    }

    recurse(data);
    return urls;
}
