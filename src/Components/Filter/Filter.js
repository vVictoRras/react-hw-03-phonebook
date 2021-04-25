import style from './Filter.module.css';

const Filter = ({ value, onFilterChange }) => (
    <div className={style.wrapper}>
        <label className={style.label}>
            Find contacts by name
            <input
                className={style.input}
                type="text"
                name="name"
                value={value}
                onChange={onFilterChange}
            />
        </label>
    </div>
);

export default Filter;