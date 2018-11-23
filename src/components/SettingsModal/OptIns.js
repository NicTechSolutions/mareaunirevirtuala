import React from 'react';

import "./OptIns.css";


export default class OptIns extends React.Component {
    constructor(props) {
        super(props);
        const refs = [];
        this.state = {
            opts: props.opts, refs
        };
    }

    componentDidMount() {
        this.state.refs.map((ref, i) => {
            if (ref.value) {
                ref.item.checked = ref.value
            }
        })
    }
    updateOpt(i) {
        const opts = this.state.opts;
        opts[i].value = opts[i].value === 0 ? 1 : 0;
        this.setState({
            opts: opts
        });

        this.props.onUpdate(this.state.opts);
    }

    render() {

        return (
            <React.Fragment>
                {this.props.opts.map((opt, i) => {
                    const ref = React.createRef();
                    return (
                        <div className="checkbox-container" key={i}>
                            <div className="message">{opt.message}</div>
                            <div className="checkbox">
                                <label value={opt.value} onChange={evt => this.updateOpt(i)} className="switch">
                                    <input type="checkbox" ref={input => {
                                        if (input) {
                                            this.state.refs.push({ item: input, value: opt.value });
                                        }
                                    }} />
                                    <span className="slider" ></span>
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