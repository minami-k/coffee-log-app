import React from 'react'
import Select from 'react-select'


const Taste = () => {
    const tasteOptions = [
        { value: 'rich', label: 'rich' },
        { value: 'sour', label: 'sour' },
        { value: 'bitter', label: 'bitter' },
        { value: 'sweet', label: 'sweet' },
        { value: 'salt', label: 'salt' },
        { value: 'fruity', label: 'fruity' },
      ]
      const TasteOptions = () => (
        <Select 
        isMulti
        options={tasteOptions} />
      )

  return (
    <div>

        <TasteOptions/>
    </div>
  )
}

export default Taste