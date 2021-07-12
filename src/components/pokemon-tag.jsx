import React from 'react'

export const PokemonTag = ({ tag }) => {
  return (
    <div
      style={{
        padding: '5px 10px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        fontSize: '0.75rem',
        textTransform: 'capitalize',
      }}
    >
      {tag}
    </div>
  )
}
