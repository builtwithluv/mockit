import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import getStatusCodeColor from 'Helpers/getStatusCodeColor';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    formControl: {
        width: '100%',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

export class StatusOrganizer extends React.PureComponent {
    static propTypes = {
        activeFixture: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        code: PropTypes.number.isRequired,
        fixtures: PropTypes.array.isRequired,
        handleSelectionChange: PropTypes.func.isRequired,
    };

    render() {
        const {
            activeFixture,
            fixtures,
            classes,
            code,
            handleSelectionChange,
        } = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}
                        style={{ color: getStatusCodeColor(code) }}
                    >
                        {code}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel hidden component="legend">Fixtures</FormLabel>
                        <RadioGroup
                            aria-label="fixtures"
                            name={activeFixture.url}
                            className={classes.group}
                            value={activeFixture.id}
                            onChange={e => handleSelectionChange({ id: e.target.value })}
                        >
                            {fixtures.map(({ id, description }) => (
                                <FormControlLabel
                                    key={id}
                                    value={id}
                                    control={<Radio color="primary" />}
                                    label={description}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(StatusOrganizer);
