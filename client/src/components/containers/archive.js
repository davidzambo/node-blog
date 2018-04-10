import React from 'react';
import {connect} from 'react-redux';
import {Card, List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const mapStateToProps = state => {
    return {
        dates: state.posts.archives
    }
};

class Archive extends React.Component {
    render() {
        console.log(this.props.dates);
        return (
            <Card fluid>
                <Card.Content header='Archívum' textAlign='center'/>
                <Card.Content>
                    <List>
                        {this.props.dates.map((date, i) => {
                            let dateFormat = moment().year(date.year).month(date.month-1).date(1);
                            return <List.Item
                                key={i}
                                as={Link}
                                to={`/archivum/${dateFormat.format('YYYY/MM')}`}
                                content={dateFormat.format('YYYY MMMM')}
                            />
                        })}
                    </List>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(mapStateToProps)(Archive);