import { NetworkProfiles } from '../enums';

export default function getNetworkProfiles(profile) {
    switch (profile) {
        case NetworkProfiles['3G_FAST']: {
            return { down: 1600, up: 768 };
        }

        case NetworkProfiles['3G_SLOW']: {
            return { down: 400, up: 400 };
        }

        case NetworkProfiles['4G_LTE']: {
            return { down: 7000000, up: 2500000 };
        }

        case NetworkProfiles.CABLE: {
            return { down: 5000, up: 1000 };
        }

        case NetworkProfiles.DISABLED: {
            return null;
        }
    }
}
