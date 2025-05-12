import React, { useState } from 'react';
import './FilePage.css';
import { useNavigate } from 'react-router-dom';

const FilePage = () => {
  const totalStorage = 50;
  const usedStorage = 17.2;
  const freeStorage = totalStorage - usedStorage;
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    { name: 'Document 1', type: 'document', isOwner: true, permission: 'edit', tags: [] },
    { name: 'Photo 1', type: 'image', isOwner: false, permission: 'view', tags: [] },
    { name: 'Video 1', type: 'video', isOwner: false, permission: 'edit', tags: [] },
  ]);

  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#ff0000');
  const [activeSection01, setActiveSection01] = useState('myDrive');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isStoragePage, setIsStoragePage] = useState(false);
  const [showCreateDrive, setShowCreateDrive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Photos');
  const [pinnedDrives, setPinnedDrives] = useState([]);
  const [showDriveList, setShowDriveList] = useState(false);

  const handleDownload = (file) => console.log(`Downloading ${file.name}`);
  const handleEdit = (file) => console.log(`Editing ${file.name}`);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = { name: file.name, type: 'other', isOwner: true, permission: 'edit', tags: [] };
      setFiles([...files, newFile]);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim() === '') return;
    const newTag = { name: newTagName.trim(), color: newTagColor };
    setTags([...tags, newTag]);
    setNewTagName('');
  };

  const addTagToFile = (fileIndex, tag) => {
    const updatedFiles = [...files];
    const currentFile = updatedFiles[fileIndex];
    if (!currentFile.tags.some(t => t.name === tag.name)) {
      currentFile.tags.push(tag);
      setFiles(updatedFiles);
    }
  };

  const removeTagFromFile = (fileIndex, tagName) => {
    const updatedFiles = [...files];
    updatedFiles[fileIndex].tags = updatedFiles[fileIndex].tags.filter(tag => tag.name !== tagName);
    setFiles(updatedFiles);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const renderCreateDriveModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Créer un nouveau Drive</h3>
        <input type="text" placeholder="Nom du Drive" className="input-field" />
        <input type="password" placeholder="Mot de passe" className="input-field" />
        <textarea placeholder="Emails des utilisateurs" className="input-field" />
        <select className="input-field">
          <option value="edit">Peut éditer</option>
          <option value="view">Juste voir</option>
        </select>
        <label className="input-label" style={{ marginTop: '10px' }}>
          Ajouter un fichier :
          <input type="file" className="input-field" onChange={handleUpload} />
        </label>
        <div style={{ marginTop: '10px' }}>
          <button className="btn btn-green">Créer</button>
          <button className="btn btn-gray" onClick={() => setShowCreateDrive(false)}>Annuler</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (isStoragePage) {
      return (
        <div style={{ padding: '20px' }}>
          <h2>Mon Stockage</h2>
          <p>Nombre total de fichiers : {files.length}</p>
          <p>Espace utilisé : {usedStorage} GB</p>
          <p>Espace libre : {freeStorage} GB</p>
          <div className="storage-files">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <h5>{file.name}</h5>
                <p>Permission : {file.permission}</p>
                <p>{file.isOwner ? 'Vous êtes le propriétaire' : "Propriétaire : Autre utilisateur"}</p>
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => removeFile(index)}>Supprimer</button>
                  <button onClick={() => handleEdit(file)}>Renommer</button>
                  <button onClick={() => handleDownload(file)}>Télécharger</button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsStoragePage(false)}
            className="menu-btn"
            style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white' }}
          >
            Fermer
          </button>
        </div>
      );
    }

    if (activeSection01 === 'myDrive') {
      return (
        <>
          <div className="top-bar">
            <div className="button-right-container">
              <button className="btn btn-blue" onClick={() => setShowCreateDrive(true)}>Create Drive</button>
            </div>
          </div>
          <div className="file-bar-container">
            {files.map((file, index) => (
              <div key={index} className="file-bar">
                <h4>{file.name}</h4>
                <p>Permission: {file.permission}</p>
                <div>
                  {file.tags.map((tag, i) => (
                    <span key={i} style={{ backgroundColor: tag.color }} className="tag">
                      {tag.name}
                      <button onClick={() => removeTagFromFile(index, tag.name)}>x</button>
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => {
                    const selectedTag = tags.find(tag => tag.name === e.target.value);
                    if (selectedTag) addTagToFile(index, selectedTag);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Ajouter un tag</option>
                  {tags.map((tag, i) => (
                    <option key={i} value={tag.name}>{tag.name}</option>
                  ))}
                </select>
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => handleDownload(file)}>Download</button>
                  {file.permission === 'edit' && (
                    <button onClick={() => handleEdit(file)}>Edit</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    const section01Titles = {
      computer: "Computer Section01",
      shared: "Shared With Me",
      recents: "Recents",
      trash: "Trash",
    };

    return <h2>{section01Titles[activeSection01] || "Welcome to Sharely"}</h2>;
  };

  const filteredFiles = files.filter((file) => {
    if (selectedCategory === 'Photos') return file.type === 'image' || file.type === 'video';
    if (selectedCategory === 'Documents') return file.type === 'document';
    return file.type === 'other';
  });

  return (
    <div className="page01">
      <div className="left">
        <div className="logoleft">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <h3>Drive Storage</h3>
        <div className="barreleft">
          <div className="section01">
            <h4>Navigation</h4>
            <ul className="menu-list">
              {['myDrive', 'computer', 'shared'].map((section01) => (
                <li key={section01}>
                  <button
                    className={`menu-btn ${activeSection01 === section01 ? 'active' : ''}`}
                    onClick={() => setActiveSection01(section01)}
                  >
                    {section01 === 'myDrive' ? 'My Drive' :
                      section01 === 'computer' ? 'Computer' : 'Shared with me'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="section0101">
            <h4>Tags</h4>
            <input
              type="text"
              placeholder="Nom du tag"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
            />
            <button onClick={handleAddTag} className="menu-btn">Ajouter le tag</button>
            <ul className="menu-list">
              {tags.map((tag, index) => (
                <li key={index} style={{ color: tag.color, fontWeight: 'bold' }}>
                  • {tag.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="section01">
            <h4>More</h4>
            <ul className="menu-list">
              {['recents', 'trash'].map((section01) => (
                <li key={section01}>
                  <button
                    className={`menu-btn ${activeSection01 === section01 ? 'active' : ''}`}
                    onClick={() => setActiveSection01(section01)}
                  >
                    {section01.charAt(0).toUpperCase() + section01.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="section01">
            <h4>Storage</h4>
            <div className="storage-bar">
              <div
                className="used"
                style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
              ></div>
            </div>
            <div className="storage-text">{usedStorage} GB used of {totalStorage} GB</div>
            <div className="storage-text">{freeStorage} GB free</div>
            <button
              className="menu-btn"
              style={{ backgroundColor: '#007bff', color: 'white' }}
              onClick={() => setIsStoragePage(true)}
            >
              Voir mon stockage
            </button>
            <button
              className="menu-btn"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => setShowConfirmDelete(true)}
            >
              Supprimer tous les fichiers
            </button>
          </div>

          {showConfirmDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Confirmation</h3>
                <p>Es-tu sûr de vouloir supprimer tous les fichiers ?</p>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{ marginRight: '10px' }} onClick={() => setShowConfirmDelete(false)}>
                    Annuler
                  </button>
                  <button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => {
                      setFiles([]);
                      setShowConfirmDelete(false);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="centre">
        <h1>My Sharely</h1>
        <h2>My Drive</h2>
        {renderContent()}
        {showCreateDrive && renderCreateDriveModal()}
      </div>

      <div className="right">
        <div className="user-info">
          <img src="/user-placeholder.jpg" alt="User" className="user-avatar" />
          <div className="user-details">
            <div className="user-greeting">Hi, <strong>John Doe</strong></div>
            <button className="profile-btn" onClick={() => navigate('/EditProfileForm')}>Profile Settings</button>
          </div>
        </div>

        <div className="file-section01">
          <h4>My Files</h4>
          <div className="file-tabs">
            {['Photos', 'Documents', 'Others'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`file-tab ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'Photos' ? 'Photos & Videos' : category}
              </button>
            ))}
          </div>
          <div className="file-preview">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, idx) => (
                <div key={idx} className="file-thumb">{file.name}</div>
              ))
            ) : (
              <p className="no-files">Aucun fichier trouvé dans cette catégorie.</p>
            )}
          </div>
        </div>

        <div className="pinned-section01">
          <h4>Pinned Drives</h4>
          <ul className="pinned-list">
            {pinnedDrives.map((file, i) => (
              <li key={i}>📌 {file.name}</li>
            ))}
          </ul>
          <button className="add-pinned-btn" onClick={() => setShowDriveList(!showDriveList)}>
            + Add Drive
          </button>
          {showDriveList && (
            <ul className="drive-list">
              {files.map((file, index) => (
                <li key={index} className="drive-item">
                  {file.name}
                  <button
                    className="pin-btn"
                    onClick={() => {
                      if (!pinnedDrives.some(d => d.name === file.name)) {
                        setPinnedDrives([...pinnedDrives, file]);
                      }
                      setShowDriveList(false);
                    }}
                  >
                    📌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePage;


