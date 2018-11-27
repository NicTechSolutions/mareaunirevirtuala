import React from 'react';
import Switch from '@material-ui/core/Switch';

import "./OptIns.css";


export default class OptIns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opts: props.opts
        };
    }

   
    updateOpt(input) {
        const id = input.target.id

        let opts = this.state.opts;
        opts[id].value = !opts[id].value ? 1 : 0;
        this.setState({
            opts: opts
        })
        this.props.onUpdate(this.state.opts);
    }

    render() {

        return (
            <React.Fragment>
                {this.props.opts.map((opt, i) => {
                    return (
                        <div className="opt">
                            <div className="checkbox-container" key={i}>
                                <div className="message">{opt.message}</div>
                                <Switch
                                    id={`${i}`}
                                    checked={opt.value === 1 ? true : false}
                                    onChange={(evt, checked) => this.updateOpt(evt, checked)}
                                    color="primary"></Switch>
                            </div>
                            <div className="separator_h"></div>
                        </div>
                    )
                })
                }
            </React.Fragment>
        )
    }
}