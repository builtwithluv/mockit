import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default function getStatusCodeColor(status) {
    if (status < 200) {
        return brown[200];
    }
    if (status < 300) {
        return green[200];
    }
    if (status < 400) {
        return brown[200];
    }
    if (status < 500) {
        return red[200];
    }
    return brown[200];
}
