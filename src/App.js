import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './Components/Form/Form';
import Filter from './Components/Filter/Filter';
import ContactsList from './Components/ContactList/ContactList';
import style from './App.module.css';

export default class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }
    componentDidMount() {
        const contactsGot = JSON.parse(localStorage.getItem('contacts'));
        if (contactsGot === null) {
            this.setState({ contacts: [] });
        } else {
            this.setState({ contacts: contactsGot });
        }
    }


    addContact = ({ name, number }) => {
        const contact = { id: shortid.generate(), name, number };

        if (this.findTheSameName(name)) {
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(({ contacts }) => ({
            contacts: [contact, ...contacts],
        }));
    };

    findTheSameName = newName => {
        const { contacts } = this.state;
        const normalizedName = newName.toLowerCase();

        return contacts.find(({ name }) =>
            name.toLowerCase().includes(normalizedName),
        );
    };

    changeFilter = e => {
        this.setState({ filter: e.currentTarget.value });
    };

    filteredList = () => {
        const { contacts, filter } = this.state;
        const normalizedValue = filter.toLowerCase();

        return contacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedValue),
        );
    };

    deleteContact = contactId => {
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(({ id }) => id !== contactId),
        }));
    };


    render() {
        const { filter } = this.state;
        const visibleValue = this.filteredList();


        return (
            <div className={style.wrapper}>
                <h1 className={style.shadow}>Phonebook</h1>
                <Form onSubmit={this.addContact} />

                <h2 className={style.shadow}>Contacts</h2>
                <Filter value={filter} onFilterChange={this.changeFilter} />
                <ContactsList contacts={visibleValue} onDelete={this.deleteContact} />
            </div>
        );
    }
}