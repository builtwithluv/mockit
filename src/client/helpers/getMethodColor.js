import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

export default function getMethodColor(method) {
    const COLORS = {
        DELETE: red[500],
        GET: green[500],
        POST: orange[500],
        PUT: blue[500],
    };

    return COLORS[method];
}
