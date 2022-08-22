const Filter = ({ filter, setFilter }) => <div> find countries <input value={filter} onChange={(e) => setFilter(e.target.value)} /></div>

export default Filter;
