import { getNetworkProfiles } from '../helpers';

export default function setThrottle(mockit, toxy) {
    return (req, res, next) => {
        const { latency } = mockit.getState();
        const profile = getNetworkProfiles(latency);

        // Needs to remove old poison to recreate new one
        toxy.remove('bandwidth');

        if (profile) {
            toxy.poison(toxy.poisons.bandwidth({ bytes: profile.down }));
        }

        next();
    };
}
