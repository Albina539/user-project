import InputField from "./InputField";
import MyButton from "./MyButton";

const FormCreateUser = ({ handleCreateSubmit, dialogRef }) => {
  return (
    <form onSubmit={handleCreateSubmit} className="create-form">
      <h3>Создать нового пользователя</h3>
      <div className="inputField-container">
        <InputField
          label="Имя пользователя"
          name="fullName"
          placeholder="Иванов Иван Иванович"
          type="text"
          required={true}
        />
        <InputField
          label="Учетная запись"
          name="site"
          placeholder="http//examle.com"
          type="text"
        />
        <InputField
          label="Почта"
          name="email"
          placeholder="example@mail.com"
          type="email"
          required={true}
        />
        <InputField
          label="Группа пользователя"
          name="group"
          placeholder="Бухгалтерия"
          type="text"
        />
        <InputField
          label="Номер телефона"
          name="telephone"
          placeholder="+123456789"
          type="tel"
        />
      </div>
      <div className="dialog-buttons">
        <MyButton
          type="submit"
          children="Создать"
          className="btn-dialog-create"
        />
        <MyButton
          type="button"
          onClick={() => {
            dialogRef.current.close();
          }}
          children="Отмена"
          className="btn-dialog-cancel"
        />
      </div>
    </form>
  );
};

export default FormCreateUser;
