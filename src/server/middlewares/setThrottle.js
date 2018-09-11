import { getNetworkProfiles } from '../helpers';

export default function setThrottle(mockit, toxy) {
    return (req, res, next) => {
        const { throttle } = mockit.getState();
        const profile = getNetworkProfiles(throttle);

        // Needs to remove old poison to recreate new one
        toxy.remove('throttle');

        if (profile) {
            toxy.poison(toxy.poisons.bandwidth({ bytes: profile.up, threshold: profile.rtt }));
        }

        next();
    };
}
