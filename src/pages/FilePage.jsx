import React, { useState } from 'react';
import './FilePage.css';
import { useNavigate } from 'react-router-dom';

const FilePage = () => {
  const totalStorage = 50;
  const usedStorage = 17.2;
  const freeStorage = totalStorage - usedStorage;
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    { id: 1, name: 'Document 1', type: 'document', isOwner: true, permission: 'edit', tags: [] },
    { id: 2, name: 'Photo 1', type: 'image', isOwner: false, permission: 'view', tags: [] },
    { id: 3, name: 'Video 1', type: 'video', isOwner: false, permission: 'edit', tags: [] },
  ]);

  // États manquants pour le formulaire de création de Drive
  const [driveName, setDriveName] = useState('');
  const [password, setPassword] = useState('');
  const [emails, setEmails] = useState('');
  const [permission, setPermission] = useState('edit');
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#ff0000');
  const [uploadedFile, setUploadedFile] = useState(null);

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
  const [profilePhoto, setProfilePhoto] = useState('/imageuser.png');
  const [username, setUsername] = useState('Utilisateur'); 

  // Gestion du téléchargement
  const handleDownload = (file) => {
    if (!file.downloadUrl) {
      alert("Le fichier ne peut pas être téléchargé car l'URL est manquante.");
      return;
    }
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigation vers la page d'édition
  const handleEdit = (file) => {
    navigate(`/edit/${file.id}`);
  };

  // Gestion du téléchargement via input file
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Création d'un nouveau Drive
  const handleCreateDrive = () => {
    if (!driveName || !password || !uploadedFile || !tagName) {
      alert("Veuillez remplir tous les champs et sélectionner un fichier.");
      return;
    }

    const tag = { name: tagName.trim(), color: tagColor };

    const newDrive = {
      id: Date.now(),
      name: driveName,
      type: 'other',
      isOwner: true,
      permission,
      tags: [tag],
      downloadUrl: URL.createObjectURL(uploadedFile),
    };

    setFiles([...files, newDrive]);
    setTags([...tags, tag]);

    // Réinitialiser le formulaire
    setDriveName('');
    setPassword('');
    setEmails('');
    setPermission('edit');
    setTagName('');
    setTagColor('#ff0000');
    setUploadedFile(null);
    setShowCreateDrive(false);
  };

  // Ajouter un nouveau tag
  const handleAddTag = () => {
    if (newTagName.trim() === '') return;
    const newTag = { name: newTagName.trim(), color: newTagColor };
    setTags([...tags, newTag]);
    setNewTagName('');
  };

  // Supprimer un fichier selon son index
  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  // Modal pour créer un nouveau Drive
  const renderCreateDriveModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Créer un Drive</h3>

        <input
          type="text"
          placeholder="Nom du Drive"
          className="input-field"
          value={driveName}
          onChange={(e) => setDriveName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          placeholder="Emails des utilisateurs"
          className="input-field"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
        <select
          className="input-field"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        >
          <option value="edit">Peut éditer</option>
          <option value="view">Juste voir</option>
        </select>
        <input
          type="text"
          placeholder="Nom du tag"
          className="input-field"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <label className="input-label">
          Couleur du tag :
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label className="input-label">
          Ajouter un fichier :
          <input
            type="file"
            className="input-field"
            onChange={handleUpload}
          />
        </label>
        <div style={{ marginTop: '10px' }}>
          <button className="btn btn-green" onClick={handleCreateDrive}>Créer</button>
          <button className="btn btn-gray" onClick={() => setShowCreateDrive(false)}>Annuler</button>
        </div>
      </div>
    </div>
  );

  // Contenu principal selon la section active
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
                <p>{file.isOwner ? 'Vous êtes le propriétaire' : 'Propriétaire : Autre utilisateur'}</p>
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
            <p className="styled-text">My Drive</p>
            <div className="button-right-container">
              <button className="btn btn-blue" onClick={() => setShowCreateDrive(true)}>
                Créer un Drive
              </button>
            </div>
          </div>

          <div className="file-bar-container">
            {files.map((file, index) => {
              const tagColor = file.tags.length > 0 ? file.tags[0].color : '#ffffff';

              return (
                <div key={index} className="folder" style={{ backgroundColor: tagColor }}>
                  <div className="folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 24 24" width="64" fill="#555">
                      <path d="M10 4H2v16h20V6H12l-2-2z" />
                    </svg>
                  </div>
                  <div className="folder-name">{file.name}</div>
                  <div className="folder-buttons">
                    <button onClick={() => handleDownload(file)}>Télécharger</button>
                    {file.permission === 'edit' && (
                      <button onClick={() => handleEdit(file)}>Modifier</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    const section01Titles = {
      computer: "Section Ordinateur",
      shared: "Partagés avec moi",
      recents: "Récents",
      trash: "Corbeille",
    };

    return <h2>{section01Titles[activeSection01] || "Bienvenue dans Sharely"}</h2>;
  };

  // Filtrage des fichiers selon catégorie sélectionnée
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
                    {section01 === 'myDrive' ? 'Mon Drive' :
                      section01 === 'computer' ? 'Ordinateur' : 'Partagés'}
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
            <h4>Plus</h4>
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
            <h4>Stockage</h4>
            <div className="storage-bar">
              <div className="used" style={{ width: `${(usedStorage / totalStorage) * 100}%` }}></div>
            </div>
            <div className="storage-text">{usedStorage} GB utilisés sur {totalStorage} GB</div>
            <div className="storage-text">{freeStorage} GB libres</div>
            <button className="menu-btn" style={{ backgroundColor: '#007bff', color: 'white' }} onClick={() => setIsStoragePage(true)}>Voir mon stockage</button>
            <button className="menu-btn" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setShowConfirmDelete(true)}>Supprimer tous les fichiers</button>
          </div>

          {showConfirmDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Confirmation</h3>
                <p>Es-tu sûr de vouloir supprimer tous les fichiers ?</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{ marginRight: '10px' }} onClick={() => setShowConfirmDelete(false)}>Annuler</button>
                  <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => { setFiles([]); setShowConfirmDelete(false); }}>Supprimer</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="centre">
        <h1 className='share'>My Sharely</h1>
        {renderContent()}
        {showCreateDrive && renderCreateDriveModal()}
      </div>

      <div className="right">
        <div className="user-info">
          <img src={profilePhoto} alt="User" className="user-avatar" />
          <div className="user-details">
            <div className="user-greeting">Hi, <strong>{username}</strong></div>
            <button className="profile-btn" onClick={() => navigate('/EditProfileForm')}>Profile Settings</button>
          </div>
        </div>
        <div className="file-section01">
          <h4>Mes Fichiers</h4>
          <div className="file-tabs">
            {['Photos', 'Documents', 'Others'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`file-tab ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'Photos' ? 'Photos & Vidéos' : category}
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
          <h4>Drives épinglés</h4>
          <ul className="pinned-list">
            {pinnedDrives.map((file, i) => (
              <li key={i}>📌 {file.name}</li>
            ))}
          </ul>
          <button className="menu-btn" onClick={() => setShowDriveList(!showDriveList)}>
            {showDriveList ? 'Masquer les drives' : 'Afficher les drives'}
          </button>
          {showDriveList && (
            <ul className="drive-list">
              {files.map((file, i) => (
                <li key={i}>
                  {file.name} 
                  <button onClick={() => {
                    if (!pinnedDrives.includes(file)) {
                      setPinnedDrives([...pinnedDrives, file]);
                    }
                  }}>Épingler</button>
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
