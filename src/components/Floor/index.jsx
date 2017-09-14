import React from 'react';

export default function Floor({ floor }) {
  return (
    <li>
      <span>{floor.userName}</span>
      <span className="date">{floor.date}</span>
      <p>{floor.content}</p>
    </li>
  );
}
