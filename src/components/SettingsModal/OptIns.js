import React from 'react';

import "./OptIns.css";


export default class OptIns extends React.Component {
    constructor(props) {
        super(props);
        const refs = [];
        this.state = { ...props.opts, refs };
    }

    componentDidMount() {
        this.state.refs.map((ref, i) => {
            if (ref.value) {
                ref.item.click()
            }
        })
    }
    updateOpt(i) {
        this.setState({
            [i]: {
                message: this.state[i].message,
                value: !this.state[i].value
            }
        });
        this.props.onUpdate(this.state);
    }
    render() {

        return (
            <React.Fragment>
                {this.props.opts.map((opt, i) => {
                    const ref = React.createRef();
                    return (
                        <div className="checkbox-container" key={i}>
                            <div>{opt.message}</div>
                            <div className="checkbox">
                                <label value={opt.value} onChange={evt => this.updateOpt(i)} className="switch">
                                    <input type="checkbox" />
                                    <span className="slider" ref={input => {
                                        if (input) {
                                            this.state.refs.push({ item: input, value: opt.value });
                                        }
                                    }}></span>
                                </label>
                            </div>
                        </div>
                    )
                })
                }
            </React.Fragment>
        )
    }
}