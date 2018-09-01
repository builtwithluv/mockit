export default function setWhiteList() {
    return function setWhiteList(req, _, next) {
        const isWhiteListed = !!req.url.match(/^\/mockit/);
        next(null, isWhiteListed);
    };
}
