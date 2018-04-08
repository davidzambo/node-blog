import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

export class Paginator extends Component {
    render() {
        return (
            <div>
                {
                    (this.props.current === 1 || this.props.current === undefined) ?
                        '' :
                        <Button
                            as='a'
                            href={'?oldal=' + ((Number(this.props.current) - 1))}
                            icon='angle left'
                            content='előző oldal'
                            labelPosition='left'
                            floated='left'
                            color='green'
                        />
                }

                {this.props.hasNext ?
                    <Button
                        as='a'
                        href={'?oldal=' + (Number(this.props.current) + 1)}
                        content='következő oldal'
                        icon='angle right'
                        floated='right'
                        color='blue'
                        labelPosition='right'
                    /> : ''
                }


            </div>
        );
    }
}

export default Paginator;