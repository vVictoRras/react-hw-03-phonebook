import React, { Component } from 'react';
import style from './Form.module.css';

export default class Form extends Component {
    state = {
        name: '',
        number: '',
    };

    handleInputChange = e => {
        const { name, value } = e.currentTarget;

        this.setState({ [name]: value });
    };

    handleFormSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);

        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    render() {
        const { name, number } = this.state;

        return (
            <form className={style.form} onSubmit={this.handleFormSubmit}>
                <label className={style.label}>
                    Name
                    <input
                        className={style.input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleInputChange}
                    ></input>
                </label>

                <label className={style.label}>
                    Number
                    <input
                        className={style.input}
                        type="number"
                        name="number"
                        value={number}
                        onChange={this.handleInputChange}
                    ></input>
                </label>

                <button className={style.btn} type="submit">
                    Add contact
                </button>
            </form>
        );
    }
}