const PersonForm = ({ name, number, setName, setNumber, submitHandler }) => (<form>
    <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div>number: <input value={number} onChange={(e) => setNumber(e.target.value)} />
    </div>
    <div>
        <button type="submit" onClick={(e) => submitHandler(e)}>add</button>
    </div>
</form>);

export default PersonForm;
