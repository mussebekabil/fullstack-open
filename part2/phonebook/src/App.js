import { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import Notification from './Notification';
import { getAll, create, update, deleteItem } from './services';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const prepareNotification = (message, className) => {
    setNotification ({ message, className})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updatePerson = () => {
    const newPerson = { name: newName, number: newNumber }
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const { id } = persons.find(p => p.name === newName);
      update(id, newPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== id ? p : response.data))
          prepareNotification(`Phone number is changed for ${newName}`, 'success')
        })
        .catch((error) => {
          let message = error.toString()
          if(error.response.status === 404) message = `Information of ${newName} has already been removed from server`
          prepareNotification(message, 'error')
        })
    }
  }
  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber }
    create(newPerson)
      .then(response => {
        setPersons([...persons, response.data])
        prepareNotification(`Added ${newName}`, 'success');
      })
      .catch(error => {
        prepareNotification(error.toString(), 'error')
      })
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteItem(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          prepareNotification(`Deleted ${name}`, 'success');
        })
        .catch(error => {
          let message = error.toString()
          if(error.response.status === 404) message = `Information of ${name} has already been removed from server`
          prepareNotification(message, 'error')
        })
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()

    if(persons.some(p => p.name === newName)) {
      updatePerson();
    } else {
      addPerson();
    }

    setNewName('')
    setNewNumber('')
  }


  const filteredList = filter === ''
    ? persons
    : persons.filter( p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
      
      <Filter filter={filter} setFilter={setFilter} />
      
      <h3>Add a  new</h3>
      
      <PersonForm 
        name={newName} 
        number={newNumber} 
        setName={setNewName} 
        setNumber={setNewNumber} 
        submitHandler={submitHandler}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredList} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App
