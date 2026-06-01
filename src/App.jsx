import { useEffect, useState } from 'react'

const STORAGE_KEYS = {
  users: 'um_users',
  current: 'um_current_user',
  view: 'um_view',
}

const seedUsers = [
  {
    id: 'u1',
    name: 'Liam Smith',
    email: 'liam@example.com',
    role: 'Project Manager',
    status: 'Active',
    joined: 'Jun 24, 2024',
    isAdmin: true,
    avatar: '',
  },
  {
    id: 'u2',
    name: 'Noah Anderson',
    email: 'noah@example.com',
    role: 'UX Designer',
    status: 'Active',
    joined: 'Mar 15, 2023',
    isAdmin: false,
    avatar: '',
  },
  {
    id: 'u3',
    name: 'Isabella Garcia',
    email: 'isabella@example.com',
    role: 'Front-End Developer',
    status: 'Inactive',
    joined: 'Apr 10, 2022',
    isAdmin: false,
    avatar: '',
  },
  {
    id: 'u4',
    name: 'William Clark',
    email: 'william@example.com',
    role: 'Product Owner',
    status: 'Active',
    joined: 'Feb 28, 2023',
    isAdmin: true,
    avatar: '',
  },
  {
    id: 'u5',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    role: 'Marketing Specialist',
    status: 'Active',
    joined: 'Oct 4, 2022',
    isAdmin: false,
    avatar: '',
  },
]

const emptyForm = {
  name: '',
  email: '',
  password: '',
  isAdmin: false,
  avatar: '',
}

const roleOptions = [
  'Admin',
  'Member',
  'Project Manager',
  'UX Designer',
  'Front-End Developer',
  'Product Owner',
  'Marketing Specialist',
  'Business Analyst',
]

const statusOptions = ['Active', 'Inactive']

const safeParse = (value, fallback) => {
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const createId = () => `user_${Math.random().toString(36).slice(2, 10)}`

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

const getInitials = (name) => {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) {
    return 'NA'
  }
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function App() {
  const [view, setView] = useState('form')
  const [users, setUsers] = useState(seedUsers)
  const [currentUser, setCurrentUser] = useState(null)
  const [formState, setFormState] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [editUser, setEditUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedUsers = safeParse(localStorage.getItem(STORAGE_KEYS.users), null)
    const storedCurrent = safeParse(
      localStorage.getItem(STORAGE_KEYS.current),
      null
    )
    const storedView = localStorage.getItem(STORAGE_KEYS.view)

    if (storedUsers && Array.isArray(storedUsers) && storedUsers.length > 0) {
      setUsers(storedUsers)
    }

    if (storedCurrent && storedCurrent.id) {
      setCurrentUser(storedCurrent)
    }

    if (storedView) {
      if (storedView === 'dashboard' && !storedCurrent) {
        setView('form')
      } else {
        setView(storedView)
      }
    } else if (storedCurrent) {
      setView('dashboard')
    }

    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
  }, [users, hydrated])

  useEffect(() => {
    if (!hydrated) {
      return
    }
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.current, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(STORAGE_KEYS.current)
    }
  }, [currentUser, hydrated])

  useEffect(() => {
    if (!hydrated) {
      return
    }
    localStorage.setItem(STORAGE_KEYS.view, view)
  }, [view, hydrated])

  const isAdmin = Boolean(currentUser?.isAdmin)
  const currentStatus = currentUser?.status || 'Active'

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormState((prev) => ({ ...prev, avatar: reader.result }))
      setFormError('')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = formState.name.trim()
    const email = formState.email.trim()
    const password = formState.password.trim()

    if (!name || !email || !password) {
      setFormError('Please fill in name, email, and password.')
      return
    }

    const newUser = {
      id: createId(),
      name,
      email,
      role: formState.isAdmin ? 'Admin' : 'Member',
      status: 'Active',
      joined: formatDate(new Date()),
      isAdmin: formState.isAdmin,
      avatar: formState.avatar,
    }

    setUsers((prev) => [newUser, ...prev])
    setCurrentUser(newUser)
    setFormState(emptyForm)
    setFormError('')
    setView('dashboard')
  }

  const startEdit = (user) => {
    setEditUser({ ...user })
  }

  const handleEditChange = (field, value) => {
    setEditUser((prev) => ({ ...prev, [field]: value }))
  }

  const cancelEdit = () => {
    setEditUser(null)
  }

  const saveEdit = () => {
    if (!editUser) {
      return
    }

    setUsers((prev) => prev.map((user) => (user.id === editUser.id ? editUser : user)))

    if (currentUser?.id === editUser.id) {
      setCurrentUser((prev) => ({ ...prev, ...editUser }))
    }

    setEditUser(null)
  }

  const removeUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))

    if (editUser?.id === userId) {
      setEditUser(null)
    }
  }

  const switchToForm = () => {
    setView('form')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">V</div>
          <div>
            <div className="brand-name">Ventures</div>
            <div className="brand-subtitle">Company</div>
          </div>
        </div>
        <nav className="nav">
          <button className="nav-item active" type="button">
            User management
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">Ventures / User management</div>
            <h1>User management</h1>
            <p className="subtitle">
              Manage your team members and their account permissions here.
            </p>
          </div>
          <div className="current-user">
            {currentUser ? (
              <div className="current-user-card">
                <div className="current-user-name">{currentUser.name}</div>
                <div className="current-user-email">{currentUser.email}</div>
                <div className="current-user-meta">
                  <span className="chip">
                    {currentUser.isAdmin ? 'Admin' : 'Member'}
                  </span>
                  <span className="chip ghost">{currentStatus}</span>
                </div>
              </div>
            ) : (
              <div className="current-user-card muted">No active profile yet</div>
            )}
            {currentUser && (
              <button className="btn btn-outline" type="button" onClick={switchToForm}>
                Register another user
              </button>
            )}
          </div>
        </header>

        {view === 'form' ? (
          <section className="card form-card">
            <div className="card-header">
              <div>
                <h2>Start with a quick profile</h2>
                <p className="card-subtitle">
                  Create your access profile to unlock the dashboard.
                </p>
              </div>
              <div className="pill">Step 1 of 1</div>
            </div>
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Morgan"
                  value={formState.name}
                  onChange={(event) => handleFormChange('name', event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={(event) => handleFormChange('email', event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formState.password}
                  onChange={(event) =>
                    handleFormChange('password', event.target.value)
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="photo">Profile picture</label>
                <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
              </div>
              <div className="field checkbox-field">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formState.isAdmin}
                    onChange={(event) =>
                      handleFormChange('isAdmin', event.target.checked)
                    }
                  />
                  <span>I am an admin</span>
                </label>
              </div>
              {formState.avatar && (
                <div className="field avatar-preview">
                  <div className="preview-label">Preview</div>
                  <img src={formState.avatar} alt="Profile preview" />
                </div>
              )}
              {formError && <div className="form-error">{formError}</div>}
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Continue to dashboard
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="dashboard">
            {editUser && (
              <div className="card edit-card">
                <div className="card-header">
                  <div>
                    <h2>Edit user</h2>
                    <p className="card-subtitle">
                      Update role or status before saving changes.
                    </p>
                  </div>
                  <div className="pill">Admin only</div>
                </div>
                <div className="form-grid compact">
                  <div className="field">
                    <label htmlFor="edit-name">Name</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={editUser.name}
                      onChange={(event) =>
                        handleEditChange('name', event.target.value)
                      }
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="edit-email">Email</label>
                    <input
                      id="edit-email"
                      type="email"
                      value={editUser.email}
                      onChange={(event) =>
                        handleEditChange('email', event.target.value)
                      }
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="edit-role">Role</label>
                    <select
                      id="edit-role"
                      value={editUser.role}
                      onChange={(event) =>
                        handleEditChange('role', event.target.value)
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="edit-status">Status</label>
                    <select
                      id="edit-status"
                      value={editUser.status}
                      onChange={(event) =>
                        handleEditChange('status', event.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn btn-outline" type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="button" onClick={saveEdit}>
                    Save changes
                  </button>
                </div>
              </div>
            )}

            <div className="card table-card">
              <div className="table-header">
                <div>
                  <h2>Team directory</h2>
                  <p className="card-subtitle">{users.length} people listed</p>
                </div>
                <div className="table-actions">
                  <button className="btn btn-outline" type="button">
                    Export
                  </button>
                  <button className="btn btn-primary" type="button" onClick={switchToForm}>
                    Add user
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className="user-row"
                        style={{ '--i': index }}
                      >
                        <td>
                          <div className="user-cell">
                            <div className="avatar">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                              ) : (
                                <span>{getInitials(user.name)}</span>
                              )}
                            </div>
                            <div>
                              <div className="user-name">{user.name}</div>
                              <div className="user-meta">
                                {user.id === currentUser?.id && (
                                  <span className="chip ghost">You</span>
                                )}
                                {user.isAdmin && <span className="chip">Admin</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              user.status === 'Active' ? 'active' : 'inactive'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>{user.joined}</td>
                        <td>
                          {isAdmin ? (
                            <div className="actions">
                              <button
                                className="btn btn-outline"
                                type="button"
                                onClick={() => startEdit(user)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeUser(user.id)}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <span className="muted">Admin only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
