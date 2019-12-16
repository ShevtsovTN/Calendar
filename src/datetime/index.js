import React, {PropTypes} from 'react';
import {bindAll} from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import Calendar from './calendar';
import Time from './time';
import './styles.less';

moment.locale('ru');

export default class Datatime extends React.Component {

    static propTypes = {
        onSave: PropTypes.func.isRequired,
        value: PropTypes.any,
        format: PropTypes.string
    };

    static defaultProps = {
        value: moment(),
        format: 'DD.MM.YYYY HH:mm'
    };

    constructor(props) {
        super(props);

        bindAll(this, ['handleFocus', 'handleSave', 'handleChange']);

        this.state = {
            isOpen: false,
            tab: 0,
            m: this.props.value
        };
    }

    handleSave() {
        this.setState({isOpen: false});
    }

    handleTabClick(tab) {
        this.props.onSave(this.state.m.format(this.props.format));
        this.setState({tab});
    }

    handleFocus() {
        if (!this.state.isOpen) this.toggle();
    }

    toggle() {
        const isOpen = !this.state.isOpen;
        this.setState({isOpen});
    }

    handleChange(m) {
        this.setState({m});
    }
    
    render() {
        const {tab, m, isOpen} = this.state;

        const btnDate = classnames('dt-btn', {'is-active': tab === 0});
        const btnTime = classnames('dt-btn', {'is-active': tab === 1});
        const calendarClasses = classnames('tab', {'is-active': tab === 0});
        const timeClasses = classnames('tab', {'is-active': tab === 1});
        const wrapperClasses = classnames('dt-popup', {'is-open': isOpen});

        return (
            <div className="b-datetime">
                <div className="dt-input">
                    <input type="text" value={m.format(this.props.format)} onFocus={this.handleFocus}/>
                </div>
                <div className={wrapperClasses}>
                    <div className="options">
                        <button className={btnDate} onClick={this.handleTabClick.bind(this, 0)}>Date</button>
                        <button className={btnTime} onClick={this.handleTabClick.bind(this, 1)}>Time</button>
                    </div>
                    <div className="tabs">
                        <Calendar
                            className={calendarClasses}
                            onChange={this.handleChange}
                            moment = {m}
                         />
                        <Time
                            className={timeClasses}
                            onChange={this.handleChange}
                            moment = {m}
                        />
                    </div>
                    <button className="dt-btn-save" onClick={this.handleSave}>Save</button>
                </div>
            </div>
        );
    }
    
}
