import React, { useState, useEffect } from "react";
import UsersWithoutGroup from "../data/UsersWithoutGroup.json";
import "../styles/UserGroup.css";

const MOCK_API_URL = "https://69ce0a5d33a09f831b7cd1b7.mockapi.io/MOCK_USERS";

const UserGroup = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Загрузка пользователей и группировка по полю group
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(MOCK_API_URL);
        let usersData = await response.json();

        const allUsers = [...UsersWithoutGroup, ...usersData];
        setUsers(allUsers);

        // Группируем пользователей по полю group
        const groupsMap = new Map();

        allUsers.forEach((user) => {
          const groupName = user.group || "Без группы";

          if (!groupsMap.has(groupName)) {
            groupsMap.set(groupName, {
              id: groupName.replace(/\s+/g, "_").toLowerCase(),
              name: groupName,
              users: [],
            });
          }

          groupsMap.get(groupName).users.push(user);
        });

        const groupsList = Array.from(groupsMap.values());
        setGroups(groupsList);

        if (groupsList.length > 0) {
          setSelectedGroup(groupsList[0]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Статистика
  const totalUsers = users.length;
  const totalGroups = groups.length;

  if (loading) {
    return (
      <div className="loading-user-container">
        <div className="loading-spinner"></div>
        <p>Загрузка групп...</p>
      </div>
    );
  }

  return (
    <div className="groups-container">
      <header className="groups-header">
        <h1>📊 Группы пользователей</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{totalUsers}</h3>
              <p>Всего пользователей</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>{totalGroups}</h3>
              <p>Всего групп</p>
            </div>
          </div>
        </div>
      </header>

      <div className="groups-layout">
        {/* Боковая панель с группами */}
        <div className="groups-sidebar">
          <div className="groups-list">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`group-item ${selectedGroup?.id === group.id ? "active" : ""}`}
                onClick={() => setSelectedGroup(group)}
              >
                <div className="group-info">
                  <span className="group-icon">
                    {group.name === "Без группы" ? "👥" : "📁"}
                  </span>
                  <span className="group-name">{group.name}</span>
                  <span className="group-count">({group.users.length})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Контент выбранной группы */}
        <div className="groups-content">
          {selectedGroup ? (
            <>
              <div className="group-details-header">
                <h2>
                  {selectedGroup.name === "Без группы" ? "👥" : "📁"}{" "}
                  {selectedGroup.name}
                </h2>
                <span className="stat-badge">
                  👥 {selectedGroup.users.length} участников
                </span>
              </div>

              <div className="users-grid">
                {selectedGroup.users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">
                      {user.fullName ? user.fullName[0].toUpperCase() : "?"}
                    </div>
                    <div className="user-info">
                      <h4>{user.fullName || "Без имени"}</h4>
                      <p>{user.email || "Нет email"}</p>
                      {user.telephone && <p>📞 {user.telephone}</p>}
                      {user.site && <p className="user-site">🔗 {user.site}</p>}
                    </div>
                  </div>
                ))}

                {selectedGroup.users.length === 0 && (
                  <div className="empty-group">
                    <div className="empty-icon">👥</div>
                    <h3>В этой группе пока нет пользователей</h3>
                    <p>
                      {selectedGroup.name === "Без группы"
                        ? "Пользователи без группы будут отображаться здесь"
                        : "Нет пользователей в этой группе"}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-group-selected">
              <div className="placeholder-icon">📂</div>
              <h3>Группа не выбрана</h3>
              <p>Выберите группу из списка слева</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserGroup;
