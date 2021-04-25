import style from './ContactList.module.css';

const ContactsList = ({ contacts, onDelete }) => (
    <ul>
        {contacts.map(({ name, number, id }) => {
            return (
                <li key={id} className={style.listItem}>
                    <span className={style.name}>{name} :</span>
                    <span className={style.number}>{number}</span>
                    <button className={style.btn} type="button" onClick={() => onDelete(id)}>
                        Delete
                    </button>
                </li>
            );
        })}
    </ul>
);

export default ContactsList;