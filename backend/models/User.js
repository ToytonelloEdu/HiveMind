import { DataTypes } from "sequelize";

export function createUserModel(database){
  database.define('User', {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) { //custom setter method
        // Saving passwords in plaintext in a database is a no-no!
        // You should at least store a secure hash of the password (as done here).
        // Even better, you should use a random salt to protect against rainbow tables.
        let hash = createHash("sha256");    
        this.setDataValue('password', hash.update(value).digest("hex"));
      }
    }
    //createdAt and updatedAt
  }, {

  })
}

