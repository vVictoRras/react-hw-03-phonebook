import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './Components/Form/Form';
import Filter from './Components/Filter/Filter';
import ContactsList from './Components/ContactList/ContactList';
import style from './App.module.css';

export default class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

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