import db from "../db/mysql.config";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const registerUser = async (profile: UserProfile) => {
  const { first_name, last_name, email, password } = profile;

  const registerQuery = `INSERT INTO profiles 
        (first_name, last_name, email, password)
        VALUES 
        (?, ?, ?, ?)`;

  try {
    await db.query(registerQuery, [first_name, last_name, email, password]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return {
    success: "User registered",
  };
};

const getUser = async () => {
  const getUserQuery = "SELECT * FROM profiles";

  let resp: any;

  try {
    resp = await db.query(getUserQuery);
  } catch (err) {
    return {
      error: err,
    };
  }

  return resp[0];
};

const deleteUser = async (id: number) => {
  const deleteUserQuery = "DELETE FROM profiles WHERE id = ?";

  let resp: any;

  try {
    resp = await db.query(deleteUserQuery, [id]);
  } catch (err) {
    return {
      error: err,
    };
  }

  if (resp[0].affectedRows === 0) {
    return {
      error: "Account already deleted",
    };
  }

  return {
    success: "Account deleted",
  };
};

const updateUser = async (id: number, body: string) => {
  const updateUserQuery = "UPDATE profiles SET first_name = ? WHERE id = ?";

  let resp: any;

  try {
    resp = await db.query(updateUserQuery, [body, id]);
  } catch (err) {
    return {
      error: err,
    };
  }

  if (resp[0].affectedRows === 0) {
    return {
      error: "Account not found",
    };
  }

  return {
    success: "User updated",
  };
};

export {
  registerUser,
  getUser,
  deleteUser,
  updateUser,
};
