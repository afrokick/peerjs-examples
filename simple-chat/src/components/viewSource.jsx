import React from 'react';

export const ViewSource = ({ repoLink }) => {
  return (
    <p>View Source on <a href={repoLink} title="View Source on GitHub" target="_blank" rel="noopener noreferrer"><img height="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/github.svg" alt="View Source on GitHub" /></a></p>
  )
}