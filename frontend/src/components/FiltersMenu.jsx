import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "react-bootstrap"
import "../styles/favourites.css"

const FiltersMenu = ({ onFilterChange }) => {
  const [selectedConditions, setSelectedConditions] = useState({})
  const [selectedTimes, setSelectedTimes] = useState({})

  const handleCheckboxChangeCondition = (event) => {
    const { value, checked } = event.target
    setSelectedConditions((prev) => {
      if (checked) {
        return { ...prev, [value]: value }
      } else {
        const { [value]: _, ...rest } = prev
        return rest
      }
    })
  }

  const handleCheckboxChangeTime = (event) => {
    const { value, checked } = event.target
    setSelectedTimes((prev) => {
      if (checked) {
        return { ...prev, [value]: value }
      } else {
        const { [value]: _, ...rest } = prev
        return rest
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFilterChange(selectedConditions, selectedTimes)
  }

  return (
    <form className="filter-menu" onSubmit={handleSubmit}>
      <div>
        <h4>Filters</h4>
      </div>
      <br />
      <div className="filter-group">
        <h4>Dietary Concern</h4>
        <label>
          <input
            type="checkbox"
            value="vegan"
            checked={"vegan" in selectedConditions}
            onChange={handleCheckboxChangeCondition}
          />
          Vegan
        </label>
        <label>
          <input
            type="checkbox"
            value="vegetarian"
            checked={"vegetarian" in selectedConditions}
            onChange={handleCheckboxChangeCondition}
          />
          Vegetarian
        </label>
        <label>
          <input
            type="checkbox"
            value="dairy free"
            checked={"dairy free" in selectedConditions}
            onChange={handleCheckboxChangeCondition}
          />
          Dairy Free
        </label>
        <label>
          <input
            type="checkbox"
            value="gluten free"
            checked={"gluten free" in selectedConditions}
            onChange={handleCheckboxChangeCondition}
          />
          Gluten Free
        </label>
      </div>
      <div className="filter-group">
        <h4>Time</h4>
        <label>
          <input
            type="checkbox"
            value="<15"
            checked={"<15" in selectedTimes}
            onChange={handleCheckboxChangeTime}
          />
          {"< 15 minutes"}
        </label>
        <label>
          <input
            type="checkbox"
            value="15-30"
            checked={"15-30" in selectedTimes}
            onChange={handleCheckboxChangeTime}
          />
          15-30 minutes
        </label>
        <label>
          <input
            type="checkbox"
            value="30-60"
            checked={"30-60" in selectedTimes}
            onChange={handleCheckboxChangeTime}
          />
          30-60 minutes
        </label>
        <label>
          <input
            type="checkbox"
            value="60-90"
            checked={"60-90" in selectedTimes}
            onChange={handleCheckboxChangeTime}
          />
          60-90 minutes
        </label>
        <label>
          <input
            type="checkbox"
            value="90+"
            checked={"90+" in selectedTimes}
            onChange={handleCheckboxChangeTime}
          />
          90+ minutes
        </label>
      </div>
      <button type="submit" className="apply-filters">
        Apply Filters
      </button>
    </form>
  )
}

export default FiltersMenu
