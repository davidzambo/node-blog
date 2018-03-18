import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

export class Paginator extends Component {
    render() {
    console.log(this.props);
    const nextPage = this.props.current === undefined ? 'oldal/2' : Number(this.props.current) + 1;
        return (
            <div>
                {
                    (this.props.current == 1 || this.props.current === undefined) ?
                        '' :
                        <Button
                            as='a'
                            href={'./' + (Number(this.props.current) - 1)}
                            icon='angle left'
                            content='előző oldal'
                            labelPosition='left'
                            floated='left'
                            color='green'
                        />
                }

                {this.props.listedPosts == 3 ?
                    <Button
                        as='a'
                        href={'./' + nextPage}
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