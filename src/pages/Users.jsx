import { useEffect, useMemo, useRef, useState } from "react";
import FormCreateUser from "../components/FormCreateUser";
import MyButton from "../components/MyButton";
import "../styles/Users.css";
import { MoveDown, MoveUp, MoveVertical } from "lucide-react";
import UserTable from "../components/UserTable";
import UsersWithoutGroup from "../data/UsersWithoutGroup.json";

const MOCK_API_URL = "https://69ce0a5d33a09f831b7cd1b7.mockapi.io/MOCK_USERS";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const dialogRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(MOCK_API_URL);
        let data = await response.json();

        setUsers([...UsersWithoutGroup, ...data]);
      } catch (error) {
        console.error("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = users;
    if (searchTerm) {
      result = users.filter((user) => {
        const groupValue = user.group ? user.group.toLowerCase() : "без группы";

        return (
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.site?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          groupValue.includes(searchTerm.toLowerCase()) ||
          user.telephone?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (sortConfig.key && sortConfig.direction) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (aVal == null) aVal = "";
        if (bVal == null) bVal = "";

        const comparison = String(aVal).localeCompare(String(bVal));
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [users, searchTerm, sortConfig.key, sortConfig.direction]);

  const sortUsers = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    } else {
      direction = "asc";
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key || !sortConfig.direction) {
      return <MoveVertical className="icon" />;
    }
    return sortConfig.direction === "asc" ? (
      <MoveUp className="icon" />
    ) : (
      <MoveDown className="icon" />
    );
  };

  const selectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const delUsers = () => {
    selectedUsers.forEach((id) => {
      fetch(`${MOCK_API_URL}/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((deletedUser) => {
          setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
          console.log("Удален пользователь: ", deletedUser);
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    });
    setSelectedUsers([]);
  };

  const createNewUserAsync = async (newData) => {
    try {
      const response = await fetch(MOCK_API_URL, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newUser = await response.json();
      setUsers([newUser, ...users]);
      dialogRef.current.close();
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formUserData = Object.fromEntries(formData);

    const newData = {
      fullName: formUserData.fullName,
      site: formUserData.site,
      email: formUserData.email,
      group: formUserData.group,
      telephone: formUserData.telephone,
    };

    createNewUserAsync(newData);
    e.target.reset();
  };

  if (loading) {
    return (
      <div className="loading-user-container">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <header>
        <h1>Список пользователей</h1>
        <div className="actions">
          <input
            type="text"
            className="input-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Поиск пользователей..."
          />
          <MyButton
            type="button"
            onClick={() => dialogRef.current.showModal()}
            children="Создать пользователя"
            className="action-btn"
          />
          <MyButton
            type="button"
            onClick={delUsers}
            children="Удалить"
            className="action-btn"
          />
        </div>
      </header>

      <UserTable
        sortUsers={sortUsers}
        getArrow={getArrow}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        selectUser={selectUser}
      />

      <dialog ref={dialogRef} className="dialog-window">
        <FormCreateUser
          handleCreateSubmit={handleCreateSubmit}
          dialogRef={dialogRef}
        />
      </dialog>
    </div>
  );
};

export default Users;
