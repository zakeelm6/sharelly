// src/components/FileItem.js
import React from 'react';
import "./FileItem.css"

function FileItem({ file, onDownload, onEdit }) {
  const getFileColor = () => {
    if (file.isOwner) return 'lightblue';
    if (file.permission === 'view') return 'lightgray';
    if (file.permission === 'edit') return 'lightgreen';
  };

  return (
    <div
      style={{
        backgroundColor: getFileColor(),
        padding: '15px',
        margin: '10px',
        borderRadius: '10px',
        width: '150px',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Vertical bars */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '5px',
        width: '3px',
        backgroundColor: '#333',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-1.5px)',
        width: '3px',
        backgroundColor: '#666',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: '5px',
        width: '3px',
        backgroundColor: '#999',
      }} />

      {/* Folder icon and content */}
      <img src="folder-icon.png" alt="Folder" style={{ width: '50px', height: '50px', zIndex: 1 }} />
      <span style={{ fontWeight: 'bold', textAlign: 'center', zIndex: 1 }}>{file.name}</span>
      <div style={{ zIndex: 1 }}>
        {file.permission !== 'view' && <button onClick={() => onEdit(file)}>Edit</button>}
        <button onClick={() => onDownload(file)} style={{ marginLeft: '5px' }}>Download</button>
      </div>
    </div>
  );
}

export default FileItem;
