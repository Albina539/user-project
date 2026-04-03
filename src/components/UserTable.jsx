import MyButton from "./MyButton";

const UserTable = ({
  sortUsers,
  getArrow,
  filteredUsers,
  selectedUsers,
  selectUser,
}) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th></th>
          <th>
            <MyButton
              type="button"
              onClick={() => sortUsers("fullName")}
              children={
                <div className="btn-children-container">
                  <span>Полное имя</span>
                  {getArrow("fullName")}
                </div>
              }
              className="button-th"
            />
          </th>
          <th>
            <MyButton
              type="button"
              onClick={() => sortUsers("site")}
              children={
                <div className="btn-children-container">
                  <span>Учетная запись</span>
                  {getArrow("site")}
                </div>
              }
              className="button-th"
            />
          </th>
          <th>
            <MyButton
              type="button"
              onClick={() => sortUsers("email")}
              children={
                <div className="btn-children-container">
                  <span>Электронная почта</span>
                  {getArrow("email")}
                </div>
              }
              className="button-th"
            />
          </th>
          <th>
            <MyButton
              type="button"
              onClick={() => sortUsers("group")}
              children={
                <div className="btn-children-container">
                  <span>Группа</span>
                  {getArrow("group")}
                </div>
              }
              className="button-th"
            />
          </th>
          <th>
            <MyButton
              type="button"
              onClick={() => sortUsers("telephone")}
              children={
                <div className="btn-children-container">
                  <span>Телефон</span>
                  {getArrow("telephone")}
                </div>
              }
              className="button-th"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr
            key={user.id}
            className={selectedUsers.includes(user.id) ? "selected-row" : ""}
          >
            <td className="cell">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => selectUser(user.id)}
              />
            </td>
            <td className="cell">{user.fullName}</td>
            <td className="cell">{user.site}</td>
            <td className="cell">{user.email}</td>
            <td className="cell">
              {user.group ? user.group : <span>Без группы</span>}
            </td>
            <td className="cell">{user.telephone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
