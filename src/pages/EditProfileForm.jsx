import React, { useState } from 'react';
import './EditProfileForm.css';

function EditProfileForm() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePhoto, setProfilePhoto] = useState('/imageuser.png');

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    institution: 'Université de Paris',
    position: 'Étudiant',
    bio: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    console.log('✔️ Profil sauvegardé :', profile);
    alert('Profil sauvegardé avec succès !');
    // TODO: envoyer à une API ou stocker en local
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("❌ Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    console.log('🔐 Mot de passe changé :', passwords);
    alert('Mot de passe mis à jour avec succès !');
    // TODO: appel API ou logique d'authentification
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <header className="settings-header">
        <img src="/logo.png" alt="Logo" className="app-logo" />
        <h1 className="app-name">My share</h1>
      </header>

      <div className="settings-main">
        {/* Sidebar */}
        <aside className="settings-sidebar">
        <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                <img
                  src={profilePhoto}
                  className="user-avatar"
                  style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
            
                  }}
                />
         </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePhotoChange}
              />
          <div className="user-info">
            <p className="user-greeting">Hi, <strong>{profile.fullName}</strong></p>
            <p className="user-subtext">Profile Setting</p>
          </div>
          <div className="nav-buttons">
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
            <button
              className={activeTab === 'security' ? 'active' : ''}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="settings-content">
          {activeTab === 'profile' && (
            <form onSubmit={saveProfile}>
              <h2>Edit Profile</h2>
              <label>
                Full Name:
                <input type="text" name="fullName" value={profile.fullName} onChange={handleProfileChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
              </label>
              <label>
                Établissement:
                <input type="text" name="institution" value={profile.institution} onChange={handleProfileChange} />
              </label>
              <label>
                Position:
                <input type="text" name="position" value={profile.position} onChange={handleProfileChange} />
              </label>
              <label>
                Bio:
                <textarea name="bio" value={profile.bio} onChange={handleProfileChange} />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={changePassword}>
              <h2>Change Password</h2>
              <label>
                Current Password:
                <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required />
              </label>
              <label>
                New Password:
                <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required />
              </label>
              <label>
                Confirm New Password:
                <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required />
              </label>
              <button type="submit">Update Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;

