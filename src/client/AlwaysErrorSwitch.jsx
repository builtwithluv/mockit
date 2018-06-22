import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export class AlwaysErrorSwitch extends React.PureComponent {
    static propTypes = {
        handleAlwaysErrorChange: PropTypes.func.isRequired,
        isOn: PropTypes.bool.isRequired,
    };

    state = {
        isOn: this.props.isOn,
    };

    handleChange = e => {
        const { handleAlwaysErrorChange } = this.props;
        const val = e.target.checked;

        handleAlwaysErrorChange(val)
            .then(_ => this.setState({ isOn: val }))
            .catch(err => console.error(err));
    }

    render() {
        const { isOn } = this.state;

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={isOn}
                        onChange={this.handleChange}
                    />
                }
                label="Always error"
            />
        );
    }
}

export default AlwaysErrorSwitch;
