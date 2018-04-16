import React from 'react';
import {connect} from 'react-redux';
import EventCalendar from '../containers/event-calendar';
import {Icon, Card} from 'semantic-ui-react';
import moment from 'moment';
import CalendarMatch from "./calendar.match";


const mapStateToProps = state => {
    return {
        events: state.match.matches,
    }
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOnDay = this.handleClickOnDay.bind(this);
        this.getToday = this.getToday.bind(this);
        this.handleSwitchMonth = this.handleSwitchMonth.bind(this);
        this.state = {
            events: [],
            dayEvents: [],
            today: this.getToday(),
        }
    }

    componentWillMount() {
        const events = this.props.events || [];
        this.setState({events, today: this.getToday()});
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('componentWillReceiveProps');
        console.log(nextProps.events);
        this.setState({events: nextProps.events});
    }

    getToday() {
        var today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
        };
    }

    nice(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    handleClickOnDay(target, day) {
        let dayEvents = this.state.events.filter(event => {
            let dateString = `${day.year}-${this.nice(day.month + 1)}-${this.nice(day.day)}`;
            return event.matchDate.slice(0, 10) === dateString;
        });
        console.log(target, day);
        const today = {
            year: day.year,
            month: day.month,
            day: day.day,
        }
        console.log(today);
        this.setState({dayEvents, today});
    }

    handleSwitchMonth(number){
        const today = Object.assign({}, this.state.today);

        if (today.month + number > 11 ) {
            today.month = 0;
            today.year++;
        } else if ( today.month + number < 0) {
            today.month = 11;
            today.year--;
        } else {
            today.month += number;
        }

        this.setState({today});
    }

    render() {
        console.log(this.state.today);
        const matches = this.state.events.map(match => {
            return {
                start: moment(match.matchDate).format('YYYY-MM-D'),
                end: moment(match.matchDate).format('YYYY-MM-D'),
                eventClasses: 'matchEvent',
                title: "",
                description: "",
            }
        });
        return (
            <Card fluid color="yellow">
                <Card.Content header="Meccs naptár" textAlign="center"/>
                <Card.Content>
                    <EventCalendar
                        daysOfTheWeek={["H","K", "Sz", "Cs", "P", "Sz", "V"]}
                        day={this.state.today.day}
                        month={this.state.today.month}
                        year={this.state.today.year}
                        events={matches}
                        maxEventSlots={1}
                        leftChangeButton={<Icon name="chevron left"/>}
                        rightChangeButton={<Icon name="chevron right"/>}
                        onDayClick={this.handleClickOnDay}
                        switchMonth={this.handleSwitchMonth}/>
                </Card.Content>
                    {
                        this.state.dayEvents.map((match, i) => <Card.Content className="calendar-match-container" key={i}>
                            <CalendarMatch details={match} key={match._id}/>
                        </Card.Content>)
                    }
            </Card>
        );
    }
}

export default connect(mapStateToProps)(Calendar)

/*EVENT SAMPLE
* const events = [
    {
        start: '2018-04-02',
        end: '2018-04-02',
        eventClasses: 'matchEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];*/