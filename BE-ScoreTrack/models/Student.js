export default (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
   name: {
  type: DataTypes.STRING,
  allowNull: false
}

   }, {
    timestamps: true,
    underscored: true 
  });
  return Student;
};
