import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        value: '',
        descrption: '',
        receipient: ''
    }

    static async getInitalProps(props) {
        const {address} = props.query;

        return {address};
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const {descrption, value, receipient} = this.state;

        try {
            const accounts = await web3.eth.getAcoounts();
            await campaign.methods.createRequest(
                descrption,
                web3.utils.toWei(value, 'ether'),
                receipient
            ).send({from: accounts[0]});
        } catch (err) {
            
        }
    }

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.descrption}
                            onChange={event => this.setState({descrption: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Receipient</label>
                        <Input 
                            value={this.state.receipient}
                            onChange={event => this.setState({receipient: event.target.value})}
                        />
                    </Form.Field>

                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;